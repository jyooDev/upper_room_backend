import NotFoundError from '../errors/NotFoundError';
import Comment, { IComment } from '../models/comment.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/controllers/comments.controller.ts');

class CommentsController {
  create() {
    return 'CREATE COMMENT';
  }

  read() {
    return 'LIST COMMENTS';
  }

  async readByPost(postId: string) {
    try {
      const comments = await Comment.find({ post: postId });
      return {
        comments,
        message: `Comments for ${postId} fetched successfully.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async isLiked(commentId: string, userId: string) {
    try {
      const isLiked = await Comment.exists({
        _id: commentId,
        likedBy: userId,
      });
      if (!isLiked) {
        return {
          isLiked: false,
        };
      } else {
        return {
          isLiked: true,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async updateLike(commentId: string, userId: string) {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) throw new NotFoundError(`Comment ${commentId} not found.`);

      const hasLiked = comment.likedBy.some(
        (id: any) => String(id) === String(userId),
      );
      let updatedComment;

      if (hasLiked) {
        // remove like
        updatedComment = await Comment.findByIdAndUpdate(
          commentId,
          { $pull: { likedBy: userId }, $inc: { 'stats.likes': -1 } },
          { new: true },
        );
      } else {
        updatedComment = await Comment.findByIdAndUpdate(
          commentId,
          { $addToSet: { likedBy: userId }, $inc: { 'stats.likes': +1 } },
          { new: true },
        );
      }

      return {
        comment: updatedComment,
        message: hasLiked ? 'Like removed.' : 'Like added.',
      };
    } catch (error) {
      throw error;
    }
  }

  update() {
    return 'UPDATE COMMENT';
  }

  delete() {
    return 'DELETE COMMENT';
  }
}

export default CommentsController;
