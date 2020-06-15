import { Schema, Types, Document, model } from 'mongoose'

export interface ICouncilMember extends Document {
    name: string,
    position: string,
    about: string,
    discordId: string,
    userId?: Types.ObjectId
}

const CouncilMember = new Schema({
    name: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    about: { type: String, required: true },
    discordId: { type: String, required: true, default: "0" },
    userId: { type: Types.ObjectId, required: false }
})

export default model<ICouncilMember>("awoo_council_member", CouncilMember)