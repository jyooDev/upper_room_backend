import { Router } from 'express';

import { OrganizationController } from "../../controllers"
import sermonRoutes from "./sermons.routes"

const router = Router();
const orgController = new OrganizationController();

router.get("/", (req, res) => {

    res.send(orgController.read());
});


router.post("/", (req, res) => {

    res.send(orgController.create());
})


router.put("/:orgId", (req, res) => {

    res.send(orgController.update());
})


router.delete("/:orgId", (req, res) => {
    res.send(orgController.delete());
})

export default router;