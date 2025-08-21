import { Router } from 'express';

import { OrganizationController } from "../../controllers"

const router = Router();
const orgController = new OrganizationController();

router.get("/", (req, res) => {

    res.send(orgController.read());
});


router.post("/", (req, res) => {

    res.send(orgController.create());
})


router.put("/{:id}", (req, res) => {

    res.send(orgController.update());
})


router.delete("/{:id}", (req, res) => {

    res.send(orgController.delete());
})


export default router;