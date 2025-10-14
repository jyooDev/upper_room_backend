import { Router } from 'express';

import { OrganizationController } from '../../controllers';
import Logger from '../../utils/logger';
import { InvalidParameterError } from '../../errors';

const router = Router();
const orgController = new OrganizationController();
const logger = new Logger('/src/routes/v1/organizations.routes.ts');

router.get('/myorg', async (req, res, next) => {
  let result = null;
  try {
    const { userId } = req.query;
    if (userId && typeof userId === 'string' && userId.trim() !== '') {
      logger.debug(`GET /api/v1/organizations/myorg?userId=${userId}`);
      result = await orgController.readByMember(userId as string);
    } else {
      throw new InvalidParameterError(
        'Missing required query parameter: userId',
      );
    }
    logger.debug(`Result: `, result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  let result = null;
  try {
    const { orgId } = req.query;
    const { orgName } = req.query;
    if (orgId) {
      logger.debug(`GET /api/v1/organizations?orgId=${orgId}`);
      result = await orgController.read(orgId as string);
    } else if (orgName) {
      result = orgController.readByName(orgName as string);
    } else {
      result = await orgController.read();
    }
    logger.debug(`Result: `, result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});
router.post('/', (req, res) => {
  res.send(orgController.create());
});

router.put('/:orgId', (req, res) => {
  res.send(orgController.update());
});

router.delete('/:orgId', (req, res) => {
  res.send(orgController.delete());
});

export default router;
