import { model, Schema } from 'mongoose';

export interface IComment {
  post: string;
  comment: string;
  author: string;
  stats: {
    likes: number;
  };
  likedBy: string[];
}

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    comment: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      ref: 'User',
    },
    stats: {
      likes: {
        type: Number,
        default: 0,
      },
    },
    likedBy: [
      {
        type: String,
        ref: 'User',
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Comment = model<IComment>('Comment', commentSchema);
export default Comment;
