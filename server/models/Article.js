const mongoose = require('mongoose')

const Article = mongoose.Schema({
    title: String,
    content: String,
    userId: mongoose.Types.ObjectId,
    createdAt: Date,
    slug: String
})

module.exports = mongoose.model("awoo_article", Article)