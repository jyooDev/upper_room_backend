import { Router } from "express";

import { CommentsController } from "../../controllers";

const router = Router();
const commentsController = new CommentsController();

router.get("/", (req, res) => {
    res.send(commentsController.read());
})

router.post("/", (req, res) => {
    res.send(commentsController.create());
})

router.put("/:commentId", (req, res) => {
    res.send(commentsController.update());
})

router.delete("/:commentId", (req, res) => {
    res.send(commentsController.delete());
})

export default router;