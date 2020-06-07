import { Schema, Document, model } from 'mongoose'

export interface IVoteStatistic extends Document {
    applicant: string,
    votes: Number
}

const VoteStatistic = new Schema({
    applicant: { type: String, required: true },
    votes: { type: Number, required: true }
})

export default model<IVoteStatistic>("awoo_council_vote", VoteStatistic)