import { Router } from 'express';

import { UsersController } from '../../controllers';
import { UserType } from '../../models/user.model';
const router = Router();
const usersController = new UsersController()

router.get("/", async (req, res) => {
  try{
    const getUsers = await usersController.read();
    res.status(201).send({ users: getUsers, message: `Successfully fetched all users.`});
  }catch(error){
    res.status(400).send({ error: error, message: `Failed to get users.`})
  }
});

router.post("/", async (req, res) => {
  try{
    console.log(req.body);
    const userReq = req.body.user;
    console.log(userReq);
    const newUser: UserType = {
      username: userReq.username,
      email: userReq.email,
      gender: userReq.gender,
      name: {
        firstName: userReq.name.firstName,
        middleName: userReq.name.middleName,
        lastName: userReq.name.lastName
      },
      role: userReq.role,
      dob: new Date(userReq.dob),
    };
    const createUser = await usersController.create(newUser);
    res.status(201).send({ user: createUser, message: "Successfully created new user."});
  }catch(error){
    res.status(400).send({ error: error, message: "Failed to create user"});
  }
});

router.put("/:userId", (req, res) => {
  res.send(usersController.update())
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try{
    const deleteUser = await usersController.delete(userId);
    res.status(201).send({message: `Successfully deleted user ${userId}`, user: deleteUser})
  }catch(error){
    console.log(error);
    res.status(400).send({message: `Failed to delete user ${userId}`, error : error})
  }
})

export default router