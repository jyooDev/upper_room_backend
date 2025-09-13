import { Router } from 'express';

import { UsersController } from '../../controllers';
import { verifyToken } from '../../middlewares';

const router = Router();
const usersController = new UsersController();

router.use(verifyToken);

router.get('/exists', async (req, res, next) => {
  try {
    const email = req.query.email as string;
    console.log('email');
    const result = await usersController.exists(email);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/{:userId}', async (req, res, next) => {
  try {
    const { userId } = req.params;
    let result = null;
    if (userId) {
      result = await usersController.read(userId);
    } else {
      result = await usersController.read();
    }
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userReq = req.body.user;
    const { _id, email, role = 'MEMBER' } = userReq;
    const result = await usersController.create({
      _id,
      email,
      role,
    });
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
    const result = await usersController.delete(userId);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.put('/set-profile/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userProfile = req.body.userProfile;
    const result = await usersController.update(userId, userProfile);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.put('/lastLogin/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await usersController.updateLastLogin(userId);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

export default router;
