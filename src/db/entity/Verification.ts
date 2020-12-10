import { getModelForClass, prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

export class Verification {
  @prop({ required: true })
  userId!: Types.ObjectId

  @prop({ required: true, unique: true })
  token!: string

  @prop({ required: true })
  type!: string
}

export default getModelForClass(Verification)
