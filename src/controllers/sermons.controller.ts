import Sermon, { ISermon } from '../models/sermon.model';
import Organization from '../models/organization.model';
import Logger from '../utils/logger';
import { Types } from 'mongoose';
const logger = new Logger('/src/controllers/sermons.controller.ts');

export interface StartLiveSermonPayload {
  organizationId: string;

  pastorName: string;
  title: string;

  originalLanguage: string;
  visibility: 'PUBLIC' | 'PRIVATE';
}

class SermonsController {
  async startLiveSermon(sermonPayload: StartLiveSermonPayload) {
    try {
      const organization = await Organization.findById(
        sermonPayload.organizationId,
      );
      if (!organization) {
        throw new Error(
          `Organization with ID ${sermonPayload.organizationId} not found.`,
        );
      }

      const sermonId = new Types.ObjectId();

      const newSermon = await Sermon.create({
        _id: sermonId,
        pastorName: sermonPayload.pastorName,
        organizationId: sermonPayload.organizationId,
        title: sermonPayload.title,
        originalLanguage: sermonPayload.originalLanguage,
        visibility: sermonPayload.visibility,

        status: 'LIVE',
        roomName: `sermon-${sermonId.toString()}`,
        startedAt: Date.now(),
      });

      logger.debug(
        `Live sermon started: ${newSermon._id} by Pastor ${newSermon.pastorName}`,
      );

      return {
        sermonId: newSermon._id.toString(),
      };
    } catch (error) {
      logger.error('Error starting live sermon:', error);
      throw error;
    }
  }

  async readByOrganization(organizationId: string) {
    try {
      const sermons = await Sermon.find({ organizationId });
      return {
        sermons,
        message: `Sermons for ${organizationId} fetched successfully.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async readByVisibility(visibility: string) {
    try {
      const sermons = await Sermon.find({ visibility });
      return {
        sermons,
        message: `All ${visibility.toUpperCase()} sermons fetched successfully. `,
      };
    } catch (error) {
      throw error;
    }
  }

  async readById(sermonId: string) {
    try {
      const sermon = await Sermon.findById(sermonId);
      return {
        sermon,
        message: `Sermon ${sermonId} fetched successfully.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      return await Sermon.find();
    } catch (error) {
      throw error;
    }
  }

  update() {
    return 'UPDATE SERMON';
  }

  delete() {
    return 'DELETE SERMON';
  }
}

export default SermonsController;
