import { connection, Types } from 'mongoose'
import { getModelForClass, prop, pre } from '@typegoose/typegoose'
import slugify from 'slugify'
import shortid from 'shortid'

@pre<Article>('save', async function (next) {
  if (!this.createdAt) this.createdAt = new Date()
  if (!this.slug) this.slug = slugify(this.title)

  const possibleSlug = await connection
    .collection('article')
    .findOne({ slug: this.slug })

  if (possibleSlug) this.slug = `${this.slug}-${shortid.generate()}`

  next()
})
export class Article {
  @prop({ required: true, unique: true })
  title!: string

  @prop({ required: true })
  content!: string

  @prop({ required: true })
  userId!: Types.ObjectId

  @prop({ required: true })
  createdAt?: Date

  @prop({ required: true, unique: true })
  slug?: string
}

export const articlePageCount = async (perPage: number) => {
  const articles = await getModelForClass(Article).find()

  if (!articles || articles.length <= 0) return 0
  if (articles.length < 1) return 0
  if (articles.length < perPage) return 1

  return Math.ceil(articles.length / perPage)
}

export default getModelForClass(Article)
