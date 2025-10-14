import NotFoundError from '../errors/NotFoundError';
import Organization from '../models/organization.model';

class OrganizationController {
  create() {
    return 'CREATE ORG';
  }

  async read(orgId?: string) {
    try {
      if (orgId) {
        const org = await Organization.findById(orgId);
        if (!org) {
          throw new NotFoundError(`Organization ${org} Not Found.`);
        }
        return {
          org,
          message: `Successfully fetched organization.`,
        };
      } else {
        const orgs = await Organization.find();
        return {
          orgs,
          message: `Successfully fetched all organizations.`,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async readByName(orgName: string) {
    try {
      const org = await Organization.findOne({ name: orgName });
      if (!org) {
        throw new NotFoundError(`Organization ${org} Not Found.`);
      }
      return {
        org,
        message: `Successfully fetched organization.`,
      };
    } catch (error) {
      throw error;
    }
  }

  //Get all organizations by user id
  async readByMember(userId: string) {
    try {
      const organizations = await Organization.find({
        $or: [
          { members: userId },
          { pastor: userId },
          { managers: userId },
          { organizer: userId },
        ],
        deletedAt: null,
      });

      return organizations;
    } catch (error) {
      throw error;
    }
  }

  update() {
    return 'UPDATE ORG';
  }

  delete() {
    return 'DELETE ORG';
  }
}

export default OrganizationController;
