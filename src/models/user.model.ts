import { model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  username?: string;
  email: string;
  gender?: 'female' | 'male';
  name?: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  role: 'ORGANIZER' | 'MEMBER';
  dob?: Date;
}

const userSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+.[^\s@]$/.test(v);
        },
        message: (props: { value: string }) =>
          `'${props.value}' is not a valid email address.`,
      },
    },
    gender: {
      type: String,
      enum: ['female', 'male'],
      required: false,
    },
    name: {
      firstName: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },
      middleName: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },
      lastName: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },
    },
    dob: {
      type: Date,
    },
    joinedOrganizations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
      },
    ],
    role: {
      type: String,
      enum: ['ORGANIZER', 'MEMBER'],
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: {
      age: {
        get() {
          if (!this.dob) return null;

          const today = new Date();
          const dob = new Date(this.dob);
          let age = today.getFullYear() - dob.getFullYear();

          const m = today.getMonth() - dob.getMonth();
          const d = today.getDate() - dob.getDate();
          if (m < 0 || (m === 0 && d < 0)) {
            age--;
          }
          return age;
        },
      },
      fullname: {
        get() {
          if (!this.name) return null;
          if (this.name.middleName) {
            return (
              this.name.firstName +
              ' ' +
              this.name.middleName +
              ' ' +
              this.name.lastName
            );
          }

          if (!this.name.middleName) {
            return this.name.firstName + ' ' + this.name.lastName;
          }
        },
      },
    },
  },
);

const User = model<IUser>('User', userSchema);

export default User;
