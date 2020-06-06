import { Schema, Types, model } from 'mongoose'

const Verification = new Schema({
    userId: { type: Types.ObjectId, required: true },
    token: { type: String, required: true, unique: true },
    type: { type: String, required: true }
})

module.exports = model("awoo_verify", Verification)