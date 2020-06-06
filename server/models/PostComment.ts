import { Schema, Types, model } from 'mongoose'

const PostComment = new Schema({
    postId: { type: Types.ObjectId, required: true },
    authorId: { type: Types.ObjectId, required: true },
    content: { type: Types.ObjectId, required: true },
    createdAt: { type: Date, required: true, default: new Date() }
})

export default model("PostComment", PostComment)