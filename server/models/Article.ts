import { Schema, Document, Types, model } from 'mongoose'

export interface IArticle extends Document {
    title: string,
    content: string,
    userId: Types.ObjectId,
    createdAt: Date,
    slug?: string
}

const Article = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true },
    createdAt: { type: Date, required: true },
    slug: { type: String, required: true, unique: true }
})

export default model<IArticle>("awoo_article", Article)