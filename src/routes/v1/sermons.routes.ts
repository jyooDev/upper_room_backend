import { Router } from 'express';

import { SermonsController } from '../../controllers';
import logger from '../../utils/logger';
import { error } from 'console';

const router = Router({ mergeParams: true });
const sermonsController = new SermonsController();

// Get api/v1/sermons?orgId=&visibility=
router.get('', async (req, res, next) => {
  let result;
  try {
    const { orgId, visibility } = req.query;
    if (orgId && typeof orgId === 'string' && orgId.trim() !== '') {
      result = await sermonsController.readByOrganization(orgId); // organization sermons
    } else if (
      visibility &&
      typeof visibility === 'string' &&
      visibility.trim() !== ''
    ) {
      result = await sermonsController.readByVisibility(visibility); // visibility sermons
    } else {
      result = await sermonsController.read(); //all sermons
    }
    res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:_id', async (req, res, next) => {
  try {
    const sermonId = req.params._id;
    const sermons = await sermonsController.readById(sermonId);
    res.status(202).send(sermons);
  } catch (error) {
    next(error);
  }
});

// POST api/v1/sermons
router.post('', async (req, res, next) => {
  try {
    const sermonReq = req.body.sermon;
    const result = await sermonsController.create({ ...sermonReq });
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

// PUT api/v1/sermons/
// router.put('/org-:orgId/:sermonId', (req, res) => {
//   res.send(sermonsController.update());
// });

// // DELETE api/v1/organizations/:ordId/sermons/:sermonid
// router.delete('/org-:orgId/:sermonId', (req, res) => {
//   res.send(sermonsController.delete());
// });

// router.get('/org-:orgId', (req, res) => {
//   res.send('GET BY ORG ID');
// });

export default router;
