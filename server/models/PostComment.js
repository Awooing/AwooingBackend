const mongoose = require('mongoose')

const PostComment = mongoose.Schema({
    postId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId,
    content: String, 
    createdAt: Date
})

module.exports = mongoose.model("PostComment", PostComment)