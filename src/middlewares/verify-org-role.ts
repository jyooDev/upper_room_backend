import { Request, Response, NextFunction } from 'express';
import Organization from '../models/organization.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/middlewares/verify-org-role.ts');

/**
 * Ensures the authenticated user is organizer, pastor, or manager of the organization.
 * Expects organizationId in req.body.sermon.organizationId or req.body.organizationId.
 */
export const verifyOrgRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req.user as { uid?: string })?.uid;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const organizationId =
      req.body?.sermon?.organizationId ?? req.body?.organizationId;

    if (!organizationId) {
      return res.status(400).json({ message: 'organizationId is required' });
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const isOrganizer = organization.organizer === userId;
    const isPastor = organization.pastor === userId;
    const isManager = organization.managers?.includes(userId) ?? false;

    if (!isOrganizer && !isPastor && !isManager) {
      logger.debug(
        `User ${userId} attempted action without org role for org ${organizationId}`,
      );
      return res.status(403).json({
        message:
          'Forbidden: Only organizer, pastor, or manager can perform this action',
      });
    }

    next();
  } catch (error) {
    logger.error('Error verifying org role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default verifyOrgRole;
