const mongoose = require('mongoose')

const VoteStatistic = mongoose.Schema({
    applicant: String,
    votes: Number
})

module.exports = mongoose.model("VoteStatistic", VoteStatistic)