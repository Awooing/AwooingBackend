import { Schema, Types, model } from 'mongoose'

const Article = new Schema({
    title: String,
    content: String,
    userId: Types.ObjectId,
    createdAt: Date,
    slug: String
})

module.exports = model("awoo_article", Article)