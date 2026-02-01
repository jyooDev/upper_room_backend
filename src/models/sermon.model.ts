import { Types, model, Schema } from 'mongoose';

export type SermonStatus = 'SCHEDULED' | 'LIVE' | 'ENDED' | 'RECORDED';

export interface ISermon {
  pastorName: string;
  organizationId: Types.ObjectId;

  title: string;
  originalLanguage: string;
  visibility: 'PUBLIC' | 'PRIVATE';

  status: SermonStatus;

  roomName?: string;

  audioUrl?: string;
  transcripts?: {
    language: string;
    url: string;
  }[];

  scheduledAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
}

const sermonSchema = new Schema<ISermon>(
  {
    pastorName: {
      type: String,
      required: true,
    },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    originalLanguage: {
      type: String,
      required: true,
    },

    visibility: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      required: true,
    },

    status: {
      type: String,
      enum: ['SCHEDULED', 'LIVE', 'ENDED', 'RECORDED'],
      required: true,
      default: 'LIVE',
      index: true,
    },

    roomName: {
      type: String,
      index: true,
    },

    audioUrl: {
      type: String,
    },

    transcripts: [
      {
        language: { type: String },
        url: { type: String },
      },
    ],

    scheduledAt: {
      type: Date,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Sermon = model<ISermon>('Sermon', sermonSchema);
export default Sermon;
