import { Schema } from 'mongoose'
import User from '../entity/User'

export class UserRepository {
  async findOneById(id: Schema.Types.ObjectId) {
    return await User.findById(id)
  }

  async fineOneBySlug(slug: string) {
    return await User.findOne({ sluggedUsername: slug })
  }
}

export default UserRepository
