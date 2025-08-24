import { model, Schema } from 'mongoose'

export interface IPost{
/* _id
Content: { title, description, media }
Stats: { likes, comments, views }
Author: userId | organizationId
postType: PRAYER_REQUEST | EVENT | MISSION_UPDATE | DAILY | TESTIMONY
createdAt
updatedAt
deletedAt
 */
    content: {
        title: string,
        description: string,
        media: [string]
    },
    stats: {
        likes: number,
        comments: [string]
        views: number,
    }
    author: string,
    postBy: string,
    postType: string
    visibility : 'PUBLIC' | 'PRIVATE'
}


const postSchema = new Schema({
    content : {
        title: {
            type: String,
            required: true
        },
        description : {
            type: String,
            default: null
        },
        media: [{type: String}]
    },
    stats: {
        likes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postType: {
        type: String,
        enum: ['PRAYER_REQUEST', 'EVENT', 'MISSION_UPDATE', 'DAILY', 'TESTIMONY'],
        required: true
    },
    visibility: {
        type: String,
        enum: ['PUBLIC', 'PRIVATE']
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})


export const Post = model<IPost>('Post', postSchema);
