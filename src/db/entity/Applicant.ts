import { getModelForClass, prop } from '@typegoose/typegoose'

export class Applicant {
  @prop({ required: true, unique: true })
  name!: string

  @prop({ required: true })
  content!: string
}

export default getModelForClass(Applicant)
