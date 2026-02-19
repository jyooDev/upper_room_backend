import { Router } from 'express';

import LiveSessionsController from '../../controllers/live-sessions.controller';
import { verifyOrgMember, verifyOrgRole, verifyToken } from '../../middlewares';
import Organization from '../../models/organization.model';

const router = Router({ mergeParams: true });
const controller = new LiveSessionsController();

// POST /api/v1/live-sessions/start
// Only organizer/pastor/manager can start.
router.post('/start', verifyToken, async (req, res, next) => {
  try {
    const { sermonId } = req.body;
    const userUid = (req.user as { uid?: string })?.uid;
    if (!sermonId) return res.status(400).json({ message: 'sermonId is required' });
    if (!userUid) return res.status(401).json({ message: 'Unauthorized' });

    // Enforce organizer/pastor/manager based on the sermon.organizationId.
    const { default: Sermon } = await import('../../models/sermon.model');
    const sermon = await Sermon.findById(sermonId);
    if (!sermon) return res.status(404).json({ message: 'sermon not found' });

    const org = await Organization.findById(sermon.organizationId);
    if (!org) return res.status(404).json({ message: 'Organization not found' });

    const isOrganizer = org.organizer === userUid;
    const isPastor = org.pastor === userUid;
    const isManager = org.managers?.includes(userUid) ?? false;

    if (!isOrganizer && !isPastor && !isManager) {
      return res.status(403).json({
        message:
          'Forbidden: Only organizer, pastor, or manager can perform this action',
      });
    }

    const result = await controller.startSession({ sermonId }, userUid);
    return res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/live-sessions/join
// Any org member can join.
router.post('/join', verifyToken, async (req, res, next) => {
  try {
    const { sermonId } = req.body;
    const userUid = (req.user as { uid?: string })?.uid;
    if (!sermonId) return res.status(400).json({ message: 'sermonId is required' });
    if (!userUid) return res.status(401).json({ message: 'Unauthorized' });

    // Determine org from sermon session, then enforce membership.
    const joinResult = await controller.joinSession(sermonId);
    if (joinResult.status !== 200) {
      return res.status(joinResult.status).json(joinResult.body);
    }

    const orgId = (joinResult.body.liveSession as any)?.orgId?.toString();
    if (!orgId) return res.status(500).json({ message: 'live session missing orgId' });

    // Inline membership check (reuses same logic as verifyOrgMember)
    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ message: 'Organization not found' });

    const isOrganizer = org.organizer === userUid;
    const isPastor = org.pastor === userUid;
    const isManager = org.managers?.includes(userUid) ?? false;
    const isMember = org.members?.includes(userUid) ?? false;

    if (!isOrganizer && !isPastor && !isManager && !isMember) {
      return res.status(403).json({ message: 'Forbidden: not a member of org' });
    }

    return res.status(200).json(joinResult.body);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/live-sessions/end
// Only organizer can end.
router.post('/end', verifyToken, async (req, res, next) => {
  try {
    const { sermonId, storeRecording } = req.body;
    const userUid = (req.user as { uid?: string })?.uid;
    if (!sermonId) return res.status(400).json({ message: 'sermonId is required' });
    if (!userUid) return res.status(401).json({ message: 'Unauthorized' });

    // Organizer-only: enforce by checking org organizer matches.
    const joinResult = await controller.joinSession(sermonId);
    if (joinResult.status !== 200) {
      return res.status(joinResult.status).json(joinResult.body);
    }

    const orgId = (joinResult.body.liveSession as any)?.orgId?.toString();
    const org = orgId ? await Organization.findById(orgId) : null;
    if (!org) return res.status(404).json({ message: 'Organization not found' });

    if (org.organizer !== userUid) {
      return res.status(403).json({ message: 'Forbidden: only organizer can end session' });
    }

    const result = await controller.endSession({ sermonId, storeRecording }, userUid);
    return res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/organizations/:orgId/live-sessions
router.get(
  '/organizations/:orgId/live-sessions',
  verifyToken,
  verifyOrgMember,
  async (req, res, next) => {
    try {
      const { orgId } = req.params;
      const result = await controller.listLiveSessions(orgId);
      return res.status(result.status).json(result.body);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
