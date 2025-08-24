import { model, Schema } from 'mongoose'

export interface IAdmin{
    username: string;
    passwordHashed: string;
}

const adminSchema = new Schema({
    username: String,
    passwordHashed: String,
    deletedAt: {
        type: Date,
        default: null
    }    
}
,{
    timestamps: true
})


export const Admin = model<IAdmin>('Admin', adminSchema);

