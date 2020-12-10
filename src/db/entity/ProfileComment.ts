import { getModelForClass, prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

export class ProfileComment {
  @prop({ required: true })
  profileId!: Types.ObjectId

  @prop({ required: true })
  authorId!: Types.ObjectId

  @prop({ required: true })
  content!: String

  @prop({ required: true, default: new Date() })
  createdAt!: Date
}

export default getModelForClass(ProfileComment)
