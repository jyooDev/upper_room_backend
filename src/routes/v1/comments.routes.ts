import { Router } from 'express';

import { CommentsController } from '../../controllers';
import Logger from '../../utils/logger';
import NotFoundError from '../../errors/NotFoundError';
import { InvalidParameterError } from '../../errors';

const router = Router();
const commentsController = new CommentsController();
const logger = new Logger('/src/routes/v1/comments.routes.ts');

router.get('', async (req, res, next) => {
  let result;
  const { postId } = req.query;
  try {
    if (postId && typeof postId === 'string' && postId.trim() !== '') {
      result = await commentsController.readByPost(postId); // post coomment
    } else {
      result = await commentsController.read(); //all posts
    }
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/is-liked', async (req, res, next) => {
  const { commentId, userId } = req.query;
  try {
    if (!(commentId && userId))
      throw new InvalidParameterError('Parameters are invalid');
    const result = await commentsController.isLiked(
      commentId as string,
      userId as string,
    );
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.put('/update-like', async (req, res, next) => {
  const { commentId, userId } = req.query;
  try {
    if (!(commentId && userId))
      throw new InvalidParameterError('Parameters are invalid');
    const result = await commentsController.updateLike(
      commentId as string,
      userId as string,
    );
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res) => {
  res.send(commentsController.create());
});

router.put('/:commentId', (req, res) => {
  res.send(commentsController.update());
});

router.delete('/:commentId', (req, res) => {
  res.send(commentsController.delete());
});

export default router;
