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
  const { postId, commentId } = req.query;
  try {
    if (postId && typeof postId === 'string' && postId.trim() !== '') {
      result = await commentsController.readByPost(postId); // post coomment
    } else if (
      commentId &&
      typeof commentId === 'string' &&
      commentId.trim() !== ''
    ) {
      result = await commentsController.readById(commentId);
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
  const { commentId, userId } = req.body.params;
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

router.post('', async (req, res, next) => {
  const commentReq = req.body.comment;
  try {
    const result = await commentsController.create({ ...commentReq });
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:commentId', async (req, res, next) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  console.log(commentId);
  try {
    const result = await commentsController.update(commentId, comment);
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:commentId/hard', async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const result = await commentsController.hardDelete(commentId as string);
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:commentId', async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const result = await commentsController.softDelete(commentId as string);
    return res.status(202).send(result);
  } catch (error) {
    next(error);
  }
});

export default router;
