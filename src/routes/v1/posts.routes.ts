import { Router } from 'express';

import { PostsController } from '../../controllers';
import Logger from '../../utils/logger';

const router = Router();
const postsController = new PostsController();
const logger = new Logger('/src/routes/v1/posts.routes.ts');

router.get('/', async (req, res, next) => {
  let result;
  const { orgId } = req.query;
  try {
    if (orgId && typeof orgId === 'string' && orgId.trim() !== '') {
      result = await postsController.readByOrganization(orgId); // organization posts
    } else {
      result = await postsController.read(); //all posts
    }
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const postReq = req.body.post;
    logger.debug(`POST /api/v1/users/`);
    const result = await postsController.create({ ...postReq });
    logger.debug('Result: ', result);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:postId', (req, res) => {
  res.send(postsController.update());
});

router.delete('/:postId', (req, res) => {
  res.send(postsController.delete());
});

export default router;
