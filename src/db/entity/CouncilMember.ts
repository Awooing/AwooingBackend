import { getModelForClass, prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

export class CouncilMember {
  @prop({ required: true, unique: true })
  name!: string

  @prop({ required: true })
  position!: string

  @prop({ required: true })
  about!: string

  @prop({ required: true, default: '0' })
  discordId: string = '0'

  @prop({ required: false })
  userId?: Types.ObjectId
}

export default getModelForClass(CouncilMember)
