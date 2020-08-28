import { Schema, Document, model } from 'mongoose'

export interface IEmote extends Document {
  name: String
  discordUrl: String
  identifier: String
}

const Emote = new Schema({
  name: { type: String, required: true, unique: true },
  discordUrl: { type: String, required: true },
  identifier: { type: String, required: true, unique: true },
})

export default model<IEmote>('awoo_emote', Emote)
