import mongoose, { Schema, Document, model, HookNextFunction } from 'mongoose'
import * as argon2 from 'argon2'
import slugify from 'slugify'
import shortid from 'shortid'

export interface IUser extends Document {
  username: string
  sluggedUsername?: string
  email: string
  password: string
  showAs?: string
  active?: number
  emailVerified?: number
  role?: string
  discordId?: string
  joinDate?: Date
  userLocation?: string
}

const User = new Schema({
  username: { type: String, required: true, unique: true },
  sluggedUsername: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  showAs: { type: String, required: true, default: 'unset' },
  active: { type: Number, required: true, default: 1 },
  emailVerified: { type: Number, required: true, default: 0 },
  role: { type: String, required: true, default: 'User' },
  discordId: { type: Number, required: true, default: 0 },
  joinDate: { type: Date, required: true, default: new Date() },
  userLocation: { type: String, required: true, default: 'unset' },
})

User.pre('save', async function (this: IUser, next: HookNextFunction) {
  let slug = this.sluggedUsername || slugify(this.username, { lower: true })
  const bySlug = await mongoose.connection
    .collection('awoo_user')
    .findOne({ sluggedUsername: slug })
  bySlug && (slug = `${slug}-${shortid.generate()}}`)

  this.sluggedUsername = slug

  this.password = await argon2.hash(this.password)
  next()
})

export default model<IUser>('awoo_user', User)
