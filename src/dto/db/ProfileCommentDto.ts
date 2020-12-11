import { ProfileComment } from '../../db/entity/ProfileComment'
import UserEntity, { User } from '../../db/entity/User'
import UserDto from './UserDto'

export class ProfileCommentDto {
  constructor(entity: ProfileComment, author?: UserDto | User | null) {
    this.profileId = entity.profileId.toHexString()
    this.authorId = entity.authorId.toHexString()
    this.content = entity.content
    this.createdAt = entity.createdAt

    if (author)
      this.author = author instanceof User ? UserDto.fromUser(author) : author
  }

  static async fromPostComment(entity: ProfileComment, fetchAuthor = false) {
    if (fetchAuthor)
      return new this(entity, await UserEntity.findById(entity.authorId))

    return new this(entity)
  }

  profileId: string

  authorId: string

  author?: UserDto

  content: String

  createdAt: Date
}
