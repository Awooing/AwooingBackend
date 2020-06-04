const mongoose = require('mongoose')

const ProfileComment = mongoose.Schema({
    profileId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId,
    content: String, 
    createdAt: Date
})

module.exports = mongoose.model("ProfileComment", ProfileComment)