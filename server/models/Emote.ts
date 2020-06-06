import { Schema, Types, model } from 'mongoose'

const Emote = new Schema({
    name: { type: String, required: true, unique: true },
    discordUrl: { type: String, required: true },
    identifier: { type: String, required: true, unique: true }
})

module.exports = model("Emote", Emote)