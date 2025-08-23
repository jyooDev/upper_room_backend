import { model, Schema} from 'mongoose'


export interface IOrganization {
    organizer: string;
    pastor?: string;
    managers?: [string];
    name: string;
    denomincation: string;
    members?: [string];
}   


const orgSchema = new Schema({
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    pastor: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    managers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        require: true
    },
    denomination:{
        type: Schema.Types.ObjectId,
        ref: 'Demonination'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const Organization = model<IOrganization>('Organization', orgSchema);

export default Organization;