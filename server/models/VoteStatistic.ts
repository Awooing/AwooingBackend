import { Schema, model } from 'mongoose'

const VoteStatistic = new Schema({
    applicant: { type: String, required: true },
    votes: { type: Number, required: true }
})

export default model("awoo_council_vote", VoteStatistic)