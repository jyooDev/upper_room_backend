import NotFoundError from '../errors/NotFoundError';
import Post, { IPost } from '../models/post.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/controllers/posts.controller.ts');

class PostsController {
  async create(postPayload: IPost) {
    try {
      if (postPayload.organizationId) {
      }
      const post = await Post.create(postPayload);
      return {
        post,
        message: `Post (${post._id}) created successfully.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async readByOrganization(organizationId: string) {
    try {
      const posts = await Post.find({ organizationId: organizationId });
      return {
        posts,
        message: `Posts for ${organizationId} fetched successfully.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateLike(postId: string, userId: string) {
    try {
      const post = await Post.findById(postId);
      if (!post) throw new NotFoundError(`Comment ${postId} not found.`);

      console.log(post.likedBy);
      let hasLiked = false;
      if (post.likedBy) {
        hasLiked = post.likedBy.some(
          (id: any) => String(id) === String(userId),
        );
      }
      let updatedPost;

      if (hasLiked) {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $pull: { likedBy: userId }, $inc: { 'stats.likes': -1 } },
          { new: true },
        );
      } else {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $addToSet: { likedBy: userId }, $inc: { 'stats.likes': +1 } },
          { new: true },
        );
      }

      return {
        comment: updatedPost,
        message: hasLiked ? 'Like removed.' : 'Like added.',
      };
    } catch (error) {
      throw error;
    }
  }

  async isLiked(postId: string, userId: string) {
    try {
      const isLiked = await Post.exists({
        _id: postId,
        likedBy: userId,
      });
      if (isLiked) {
        return {
          isLiked: true,
        };
      } else {
        return { isLiked: false };
      }
    } catch (error) {
      throw error;
    }
  }

  read() {
    return 'LIST POST';
  }

  update() {
    return 'UPDATE POST';
  }

  delete() {
    return 'DELETE PSOT';
  }
}

export default PostsController;
