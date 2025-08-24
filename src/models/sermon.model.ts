import { model, Schema } from 'mongoose'

export interface ISermon{
    pastorId: string,
    organizationId: string,
    title: string,
    audioUrl: string,
    transcript: [],
    original_language: string,
    visibility: 'PUBLIC' | 'PRIVATE'
}

const sermonSchema = new Schema({
    pastorId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organizationId : {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    title : {
        type: String,
        required: true
    },
    audioUrl :  {
        type: String,
        required: true
    },
    transcripts : [{
        type: String
    }],
    originalLanguage : {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        enum: ['PUBLIC', 'PRIVATE'],
        required: true
    }
},{
    timestamps: true
})


export const Sermon = model<ISermon>('Sermon', sermonSchema);