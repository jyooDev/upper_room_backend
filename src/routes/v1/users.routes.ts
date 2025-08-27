import { Router } from 'express';

import { UsersController } from '../../controllers';
const router = Router();
const usersController = new UsersController();

router.get('/{/:userId}', async (req, res) => {
  console.log('userId =', req.params.userId);
  const { userId } = req.params;
  try {
    const getUsers = await usersController.read(userId);

    res
      .status(201)
      .send({ users: getUsers, message: `Successfully fetched all users.` });
  } catch (error) {
    res.status(400).send({ error: error, message: `Failed to get users.` });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userReq = req.body.user;
    console.log('IN ROUTE ', userReq);
    const { email, role = 'MEMBER' } = userReq;
    const createUser = await usersController.create({
      email,
      role,
    });
    res
      .status(201)
      .send({ user: createUser, message: 'Successfully created new user.' });
  } catch (error) {
    res.status(400).send({ error: error, message: 'Failed to create user' });
  }
});

router.put('/:userId', (req, res) => {
  res.send(usersController.update());
});

router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const deleteUser = await usersController.delete(userId);
    res.status(201).send({
      message: `Successfully deleted user ${userId}`,
      user: deleteUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Failed to delete user ${userId}`, error: error });
  }
});

router.get('/exists', async (req, res) => {
  const email = req.query.email as string;
  console.log('email =', email);
  const doesExist = await usersController.exists(email);
  // const email = req.query.email;
  // const doesExist = await usersController.exists(email);
  res.send(doesExist || false);
});

export default router;
