import { model, Schema } from 'mongoose';

export interface IPost {
  content: {
    title: string;
    description?: string;
    media?: string[];
  };
  stats: {
    likes: number;
    commentsCount: number;
    views: number;
  };
  likedBy: string[];
  commentsPreview?: {
    _id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string | null;
    text: string;
    likes: number;
  }[];
  author: {
    _id: string;
    name: string;
    avatar?: string | null;
  };
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
      likes: { type: Number, default: 0 },
      views: { type: Number, default: 0 },
      commentsCount: { type: Number, default: 0 },
    },
    likedBy: {
      type: String,
      ref: 'User',
    },
    commentsPreview: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Comment' },
        authorId: { type: String, required: true }, // Firebase UID
        authorName: { type: String, required: true },
        authorAvatar: { type: String, default: null },
        text: { type: String, required: true },
        likes: { type: Number, default: 0 },
      },
    ],
    author: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String, default: null },
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
