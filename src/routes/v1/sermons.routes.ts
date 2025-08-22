import { Router } from "express";

import { SermonsController } from "../../controllers";

const router = Router({ mergeParams: true});
const sermonsController = new SermonsController();


router.get('/', (req, res) => {
    res.send(sermonsController.read());
})

// POST api/v1/organizations/:orgId/sermons
router.post('/org-:orgId/:sermonId', (req, res) => {
    res.send(sermonsController.create());
})

// PUT api/v1/org-:ordId/sermons/:sermonId
router.put('/org-:orgId/:sermonId', (req, res) => {
    res.send(sermonsController.update());
})

// DELETE api/v1/organizations/:ordId/sermons/:sermonid
router.delete('/org-:orgId/:sermonId', (req, res) => {
    res.send(sermonsController.delete());
})

router.get("/org-:orgId", (req, res) => {
    res.send("GET BY ORG ID")
})



export default router;