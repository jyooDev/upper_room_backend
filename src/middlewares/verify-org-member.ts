import { Request, Response, NextFunction } from 'express';
import Organization from '../models/organization.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/middlewares/verify-org-member.ts');

/**
 * Ensures the authenticated user belongs to the organization.
 * Belongs means: organizer, pastor, manager, or member.
 *
 * Expects orgId in:
 * - req.params.orgId OR
 * - req.body.organizationId OR
 * - req.body.orgId
 */
export const verifyOrgMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req.user as { uid?: string })?.uid;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const orgId = req.params.orgId ?? req.body?.organizationId ?? req.body?.orgId;
    if (!orgId) return res.status(400).json({ message: 'orgId is required' });

    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ message: 'Organization not found' });

    const isOrganizer = org.organizer === userId;
    const isPastor = org.pastor === userId;
    const isManager = org.managers?.includes(userId) ?? false;
    const isMember = org.members?.includes(userId) ?? false;

    if (!isOrganizer && !isPastor && !isManager && !isMember) {
      logger.debug(`User ${userId} is not a member of org ${orgId}`);
      return res.status(403).json({ message: 'Forbidden: not a member of org' });
    }

    next();
  } catch (err) {
    logger.error('verifyOrgMember error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default verifyOrgMember;
