import { Schema, Document, model } from 'mongoose'

export interface IApplicant extends Document {
  name: string
  content: string
}

const Applicant = new Schema({
  name: { type: String, required: true, unique: true },
  content: { type: String, required: true },
})

export default model<IApplicant>('awoo_council_applicant', Applicant)
