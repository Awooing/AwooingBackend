import { prop, getModelForClass } from '@typegoose/typegoose'

export class VoteStatistic {
  @prop({ required: true })
  applicant!: string

  @prop({ required: true })
  votes!: number
}

export default getModelForClass(VoteStatistic)
