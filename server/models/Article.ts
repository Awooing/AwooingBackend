import { Schema, Types, model } from 'mongoose'

const Article = new Schema({
    title: String,
    content: String,
    userId: Types.ObjectId,
    createdAt: Date,
    slug: String
})

export default model("awoo_article", Article)