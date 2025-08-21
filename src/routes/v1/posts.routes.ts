import { Router } from "express";

import { PostsController } from "../../controllers"


const router = Router();
const postsController = new PostsController()


router.get("/", (req,res) => {
    res.send(postsController.read());
})


router.post("/", (req, res) => {
    res.send(postsController.create());
})

router.put("/:postId", (req, res) => {
    res.send(postsController.update());
})

router.delete("/:postId", (req, res) => {
    res.send(postsController.delete());
})



export default router;