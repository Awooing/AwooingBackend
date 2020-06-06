import { Schema, model } from 'mongoose'

const Applicant = new Schema({
    name: { type: String, required: true, unique: true },
    content: { type: String, required: true }
})

export default model("awoo_council_applicant", Applicant)