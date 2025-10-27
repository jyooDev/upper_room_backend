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
    } catch (error) {}
  }
  update() {
    return 'UPDATE COMMENT';
  }

  delete() {
    return 'DELETE COMMENT';
  }
}

export default CommentsController;
