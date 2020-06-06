import { Schema, model } from 'mongoose'

const VoteStatistic = new Schema({
    applicant: { type: String, required: true },
    votes: { type: Number, required: true }
})

module.exports = model("awoo_council_vote", VoteStatistic)