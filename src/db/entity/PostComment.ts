import { Schema, Types, Document, model } from 'mongoose'

export interface IPostComment extends Document {
  postId: Types.ObjectId
  authorId: Types.ObjectId
  content: string
  createdAt: Date
}

const PostComment = new Schema({
  postId: { type: Types.ObjectId, required: true },
  authorId: { type: Types.ObjectId, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
})

export default model<IPostComment>('awoo_post_comment', PostComment)
