import NotFoundError from '../errors/NotFoundError';
import Comment, { IComment } from '../models/comment.model';
import Post from '../models/post.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/controllers/comments.controller.ts');

class CommentsController {
  async create(commentPayload: IComment) {
    try {
      const comment = await Comment.create(commentPayload);
      const { post } = commentPayload;
      await Post.findByIdAndUpdate(post, {
        $inc: { 'stats.comments': 1 },
      });

      return {
        comment,
        message: `comment ${comment._id} created successfully.`,
      };
    } catch (error) {
      throw error;
    }
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

  async readById(commentId: string) {
    try {
      const comment = await Comment.findById(commentId);
      let message;
      if (!comment) {
        throw new NotFoundError(`Comment ${commentId} not found.`);
      }
      return {
        comment,
        message: `Comment ${commentId} fetched successfully.`,
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

      const hasLiked = comment.likedBy?.some(
        (id: any) => String(id) === String(userId),
      );
      let updatedComment;

      if (hasLiked) {
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

  async update(commentId: string, comment: string) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { comment },
        { new: true, runValidators: true },
      );

      if (!updatedComment) {
        throw new NotFoundError(`Comment ${commentId} not found.`);
      }
      return {
        message: `Comment ${commentId} updated successfully`,
        comment: updatedComment,
      };
    } catch (error) {
      throw error;
    }
  }

  async hardDelete(commentId: string) {
    try {
      const comment = await Comment.findByIdAndDelete(commentId);

      if (!comment) {
        throw new NotFoundError(`Comment ${commentId} not found.`);
      }

      const postId = comment.post;
      if (postId) {
        await Post.findByIdAndUpdate(postId, {
          $inc: { 'stats.comments': -1 },
        });
      }

      return {
        comment,
        message: `Successfully deleted comment ${commentId} permanently.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async softDelete(commentId: string) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        commentId,
        { deletedAt: new Date() },
        { new: true },
      );

      if (!comment) {
        throw new NotFoundError(`comment ${commentId} Not Found.`);
      }

      const postId = comment.post;
      if (postId) {
        await Post.findByIdAndUpdate(postId, {
          $inc: { 'stats.comments': -1 },
        });
      }

      return {
        comment,
        message: `Successfully soft deleted comment ${commentId}`,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default CommentsController;
