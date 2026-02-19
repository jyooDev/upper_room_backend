import { model, Schema, Types } from 'mongoose';

export type LiveSessionStatus = 'LIVE' | 'ENDED';
export type LiveSessionVisibility = 'PUBLIC' | 'PRIVATE';

export interface ISermonLiveSession {
  sermonId: Types.ObjectId;
  orgId: Types.ObjectId;
  roomName: string;
  visibility: LiveSessionVisibility;
  status: LiveSessionStatus;
  startedAt: Date;
  endedAt?: Date;

  createdBy: string; // firebase uid
  endedBy?: string; // firebase uid

  // Optional hint for downstream behavior
  storeRecording?: boolean;
}

const sermonLiveSessionSchema = new Schema<ISermonLiveSession>(
  {
    sermonId: {
      type: Schema.Types.ObjectId,
      ref: 'Sermon',
      required: true,
      index: true,
    },
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },
    roomName: {
      type: String,
      required: true,
      index: true,
    },
    visibility: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      required: true,
      default: 'PRIVATE',
      index: true,
    },
    status: {
      type: String,
      enum: ['LIVE', 'ENDED'],
      required: true,
      default: 'LIVE',
      index: true,
    },
    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endedAt: {
      type: Date,
    },
    createdBy: {
      type: String,
      required: true,
      index: true,
    },
    endedBy: {
      type: String,
    },
    storeRecording: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Only one LIVE session per sermon.
sermonLiveSessionSchema.index(
  { sermonId: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: 'LIVE' } },
);

const SermonLiveSession = model<ISermonLiveSession>(
  'SermonLiveSession',
  sermonLiveSessionSchema,
);

export default SermonLiveSession;
