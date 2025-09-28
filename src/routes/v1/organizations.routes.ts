import { Router } from 'express';

import { OrganizationController } from '../../controllers';
import Logger from '../../utils/logger';

const router = Router();
const orgController = new OrganizationController();
const logger = new Logger('src/routes/v1/organizations.routes.ts');

// GET api/v1/organizations/:userId
router.get('/{:userId}', async (req, res, next) => {
  try {
    const { userId } = req.params;
    logger.debug(`GET /api/v1/organizations/${userId}`);
    let result = null;
    if (userId) {
      result = await orgController.read(userId);
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
