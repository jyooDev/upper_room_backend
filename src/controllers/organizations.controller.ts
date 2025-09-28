import NotFoundError from '../errors/NotFoundError';
import Organization from '../models/organization.model';

class OrganizationController {
  create() {
    return 'CREATE ORG';
  }

  async read(userId?: string) {
    try {
      if (userId) {
        const orgs = await Organization.find().where('members').in([userId]);
        if (!orgs) {
          throw new NotFoundError(`No organization found for user ${userId}.`);
        }
        return {
          orgs,
          message: `Successfully fetched organizations for user ${userId}.`,
        };
      }

      const orgs = await Organization.find();
      if (orgs.length === 0) {
        throw new NotFoundError(`No organization found for user ${userId}.`);
      }
      return {
        orgs,
        message: `Successfully fetched all organizations`,
      };
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
