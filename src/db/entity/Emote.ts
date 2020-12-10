import { getModelForClass, prop } from '@typegoose/typegoose'

export class Emote {
  @prop({ required: true, unique: true })
  name!: string

  @prop({ required: true })
  discordUrl!: string

  @prop({ required: true, unique: true })
  identifier!: string
}

export default getModelForClass(Emote)
