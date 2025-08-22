import { Router } from 'express';

import { UsersController } from '../../controllers';

const router = Router();
const usersController = new UsersController()

router.get("/", (req, res) => {
  
  res.send(usersController.read())
});

router.post("/", async (req, res) => {
  res.send(await usersController.create())
});

router.put("/:userId", (req, res) => {
  res.send(usersController.update())
});

router.delete("/:userId", (req, res) => {
  res.send(usersController.delete())
})

export default router