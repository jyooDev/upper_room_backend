import { model, Schema } from 'mongoose';

export interface IOrganization {
  organizer: string;
  pastor?: string;
  managers?: [string];
  name: string;
  denomination: Schema.Types.ObjectId;
  members?: [string];
  logoURL?: string;
}

const orgSchema = new Schema(
  {
    organizer: {
      type: String,
      ref: 'User',
      require: true,
    },
    pastor: {
      type: String,
      ref: 'User',
    },
    managers: [
      {
        type: String,
        ref: 'User',
      },
    ],
    name: {
      type: String,
      require: true,
    },
    denomination: {
      type: Schema.Types.ObjectId,
      ref: 'Demonination',
    },
    members: [
      {
        type: String,
        ref: 'User',
      },
    ],
    logoURL: {
      type: String,
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

const Organization = model<IOrganization>('Organization', orgSchema);

export default Organization;
