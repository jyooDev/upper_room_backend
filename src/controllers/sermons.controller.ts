import Sermon, { ISermon } from '../models/sermon.model';
import Organization from '../models/organization.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/controllers/sermons.controller.ts');

class SermonsController {
  async create(sermonPayload: ISermon) {
    try {
      if (sermonPayload.organizationId) {
        const organization = await Organization.findById(
          sermonPayload.organizationId,
        );
        if (!organization) {
          throw new Error(
            `Organization with ID ${sermonPayload.organizationId} not found.`,
          );
        }
      }
      const sermon = await Sermon.create(sermonPayload);
      return {
        sermon,
        message: `Sermon (${sermon._id}) created successfully.`,
      };
    } catch (error) {
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
