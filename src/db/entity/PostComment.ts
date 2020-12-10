import { getModelForClass, prop } from '@typegoose/typegoose'
import { Schema, Types, Document, model } from 'mongoose'

export class PostComment {
  @prop({ required: true })
  postId!: Types.ObjectId

  @prop({ required: true })
  authorId!: Types.ObjectId

  @prop({ required: true })
  content!: string

  @prop({ required: true, default: new Date() })
  createdAt!: Date
}

export default getModelForClass(PostComment)
