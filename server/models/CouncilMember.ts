import { Schema, Types, model } from 'mongoose'

const CouncilMember = new Schema({
    name: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    about: { type: String, required: true },
    discordId: { type: Number, required: true, default: 0 },
    userId: { type: Types.ObjectId, required: false }
})

export default model("awoo_council_members", CouncilMember)