import { model, Schema } from 'mongoose'

export interface IDenomination{
    name: string
}


const denominationSchema = new Schema({
    name: String,
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

export const Denomination = model<IDenomination>('Denomination', denominationSchema);
