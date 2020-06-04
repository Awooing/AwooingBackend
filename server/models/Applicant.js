const mongoose = require('mongoose')

const Applicant = mongoose.Schema({
    name: String,
    content: String
})

module.exports = mongoose.model("Applicant", Applicant)