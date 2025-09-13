import { Router } from 'express';

import { UsersController } from '../../controllers';
import { verifyToken } from '../../middlewares';
import Logger from '../../utils/logger';

const router = Router();
const usersController = new UsersController();
const logger = new Logger('/src/routes/v1/users.routes.ts');

router.use(verifyToken);

router.get('/exists', async (req, res, next) => {
  try {
    const email = req.query.email as string;
    logger.debug(`GET /api/v1/users/exists?email=${email}`);
    const result = await usersController.exists(email);
    logger.debug('Result: ', result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/{:userId}', async (req, res, next) => {
  try {
    const { userId } = req.params;
    logger.debug(`GET /api/v1/users/exists/userId=${userId}`);
    let result = null;
    if (userId) {
      result = await usersController.read(userId);
    } else {
      result = await usersController.read();
    }
    logger.debug(`Result: `, result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userReq = req.body.user;
    logger.debug(`POST /api/v1/users/`);
    const { _id, email, role = 'MEMBER' } = userReq;
    const result = await usersController.create({
      _id,
      email,
      role,
    });
    logger.debug('Result: ', result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

// router.put('/:userId', (req, res) => {
//   res.send(usersController.update());
// });

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    logger.debug(`DELETE /api/v1/users/${userId}`);
    const result = await usersController.delete(userId);
    logger.debug('Result: ', result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.put('/set-profile/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userProfile = req.body.userProfile;
    logger.debug(`PUT /api/v1/users/set-profile/${userId}`);
    const result = await usersController.update(userId, userProfile);
    logger.debug('Result: ', result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.put('/last-login/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    logger.debug(`PUT /api/v1/users/last-login/${userId}`);
    const result = await usersController.updateLastLogin(userId);
    logger.debug('Result: ', result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

export default router;
