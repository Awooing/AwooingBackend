const mongoose = require('mongoose')

const Emote = mongoose.Schema({
    name: String,
    discordUrl: String,
    identifier: String
})

module.exports = mongoose.model("Emote", Emote)