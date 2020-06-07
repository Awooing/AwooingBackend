import { Schema, Types, Document, model } from 'mongoose'

export interface IVerification extends Document {
    userId: Types.ObjectId,
    type: string
}

const Verification = new Schema({
    userId: { type: Types.ObjectId, required: true },
    token: { type: String, required: true, unique: true },
    type: { type: String, required: true }
})

export default model<IVerification>("awoo_verify", Verification)