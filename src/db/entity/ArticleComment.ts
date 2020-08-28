import { Schema, Types, Document, model } from 'mongoose'

export interface IArticleComment extends Document {
  articleId: Types.ObjectId
  authorId: Types.ObjectId
  content: string
  createdAt?: Date
}

const ArticleComment = new Schema({
  articleId: { type: Schema.Types.ObjectId, required: true },
  authorId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
})

export default model<IArticleComment>('awoo_article_comment', ArticleComment)
