import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IProfileComment extends Document {
    profileId: Types.ObjectId,
    authorId: Types.ObjectId,
    content: String, 
    createdAt: Date
}

const ProfileComment = new Schema({
    profileId: { type: Types.ObjectId, required: true },
    authorId: { type: Types.ObjectId, required: true },
    content: { type: Types.ObjectId, required: true },
    createdAt: { type: Date, required: true, default: new Date() }
})

export default mongoose.model<IProfileComment>("awoo_profile_comment", ProfileComment)