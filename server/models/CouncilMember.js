const mongoose = require('mongoose')

const CouncilMember = mongoose.Schema({
    name: String,
    position: String,
    about: String,
    discordId: Number,
    userId: Number
})

module.exports = mongoose.model("CouncilMember", CouncilMember)