import { model, Schema } from 'mongoose';

export interface IPost {
  content: {
    title: string;
    description?: string;
    media?: string[];
  };
  stats: {
    likes: number;
    comments: string[];
    views: number;
  };
  author: string;
  postType:
    | 'PRAYER_REQUEST'
    | 'EVENT'
    | 'MISSION_UPDATE'
    | 'DAILY'
    | 'TESTIMONY';
  visibility: 'PUBLIC' | 'PRIVATE';
  organizationId?: string | null;
}

const postSchema = new Schema(
  {
    content: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: null,
      },
      media: [{ type: String }],
    },
    stats: {
      likes: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
    author: {
      type: String,
      ref: 'User',
    },
    postType: {
      type: String,
      enum: ['PRAYER_REQUEST', 'EVENT', 'MISSION_UPDATE', 'DAILY', 'TESTIMONY'],
      required: true,
    },
    visibility: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Post = model<IPost>('Post', postSchema);
export default Post;
