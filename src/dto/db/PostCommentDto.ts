import { PostComment } from '../entity/PostComment'
import UserEntity, { User } from '../entity/User'
import UserDto from './UserDto'

export class PostCommentDto {
  constructor(entity: PostComment, author?: UserDto | User | null) {
    this.postId = entity.postId.toHexString()
    this.authorId = entity.authorId.toHexString()
    this.content = entity.content
    this.createdAt = entity.createdAt

    if (author)
      this.author = author instanceof User ? UserDto.fromUser(author) : author
  }

  static async fromPostComment(entity: PostComment, fetchAuthor = false) {
    if (fetchAuthor)
      return new this(entity, await UserEntity.findById(entity.authorId))

    return new this(entity)
  }

  postId: string

  authorId: string

  author?: UserDto

  content: string

  createdAt: Date
}
