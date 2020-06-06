import mongoose, { Schema, Document, Types } from 'mongoose'


const ProfileComment = new Schema({
    profileId: { type: Types.ObjectId, required: true },
    authorId: { type: Types.ObjectId, required: true },
    content: { type: Types.ObjectId, required: true },
    createdAt: { type: Date, required: true, default: new Date() }
})

export default mongoose.model("awoo_profile_comment", ProfileComment)