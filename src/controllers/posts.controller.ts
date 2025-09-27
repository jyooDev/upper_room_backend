import Post, { IPost } from '../models/post.model';
import Logger from '../utils/logger';

const logger = new Logger('/src/controllers/posts.controller.ts');

class PostsController {
  async create(postPayload: IPost) {
    // const post = await Post.create(postPayload);
    logger.debug('POST: ', postPayload);
    return 'CREATE POST';
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
