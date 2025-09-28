import Post, { IPost } from '../models/post.model';
import Logger from '../utils/logger';
import { Types } from 'mongoose';
const logger = new Logger('/src/controllers/posts.controller.ts');

class PostsController {
  async create(postPayload: IPost) {
    try {
      logger.debug(postPayload.author);
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
