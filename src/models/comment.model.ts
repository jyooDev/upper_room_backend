import { model, Schema } from 'mongoose'

export interface IComment{
    comment: string;
    author: string;
    stats: {
        likes: number,
    };
}


const commentSchema = new Schema({
    post : {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    stats: {
        likes:{
            type: Number,
            default: 0
        }
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, 
{
    timestamps: true
})

export const Comment = model<IComment>('Comment', commentSchema);