import mongoose, {
  Schema,
  Document,
  Types,
  model,
  HookNextFunction,
} from 'mongoose'
import shortid from 'shortid'
import slugify from 'slugify'

export interface IArticle extends Document {
  title: string
  content: string
  userId: Types.ObjectId
  createdAt?: Date
  slug?: string
}

const Article = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  slug: { type: String, required: false, unique: true },
})

Article.pre('save', async function (this: IArticle, next: HookNextFunction) {
  let slug = this.slug || slugify(this.title, { lower: true })
  const slugExists = await mongoose.connection
    .collection('awoo_articles')
    .findOne({ slug })
  slugExists && (slug = `${slug}-${shortid.generate()}`)

  this.slug = slug

  const authorExists = await mongoose.connection
    .collection('awoo_users')
    .findOne({ _id: this.userId })
  if (!authorExists) throw new Error("Author doesn't exist.")

  next()
})

export default model<IArticle>('awoo_article', Article)
