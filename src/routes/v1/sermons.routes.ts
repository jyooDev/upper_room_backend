import { Router } from "express";

import { SermonsController } from "../../controllers";

const router = Router({ mergeParams: true});
const sermonsController = new SermonsController();


// Retrieve all sermons from an organization
// GET api/v1/organizations/:orgId/sermons/:sermonId
// Retrieve all sermons across all organizations
// GET api/v1/sermons/:sermonId 
router.get('/', (req, res) => {
    const orgId = (req.params as { orgId?: string }).orgId;
    res.send(sermonsController.read(orgId));
})

// POST api/v1/organizations/:orgId/sermons
router.post('/', (req, res) => {
    res.send(sermonsController.create());
})

// PUT api/v1/organizations/:ordId/sermons/:sermonId
router.put('/:sermonId', (req, res) => {
    res.send(sermonsController.update());
})

// DELETE api/v1/organizations/:ordId/sermons/:sermonid
router.delete('/:sermonId', (req, res) => {
    res.send(sermonsController.delete());
})

export default router;