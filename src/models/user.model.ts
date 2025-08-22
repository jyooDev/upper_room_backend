import { Document, model, Schema} from 'mongoose'

export interface IUser extends Document {
  //
  email: string
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})

const User = model<IUser>("User", userSchema);

export default User

