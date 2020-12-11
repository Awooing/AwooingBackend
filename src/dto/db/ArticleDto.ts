import { Article } from '../../db/entity/Article'
import UserEntity, { User } from '../../db/entity/User'
import UserDto from './UserDto'

export class ArticleDto {
  constructor(entity: Article, user?: UserDto | User | null) {
    this.title = entity.title
    this.content = entity.content
    this.userId = entity.userId.toHexString()
    this.createdAt = entity.createdAt
    this.slug = entity.slug

    if (user) this.user = user instanceof User ? UserDto.fromUser(user) : user
  }

  static async fromArticle(entity: Article, fetchUser = false) {
    if (fetchUser)
      return new this(entity, await UserEntity.findById(entity.userId))

    return new this(entity)
  }

  static async fromArticles(entities: Article[], fetchUsers = false) {
    const dtos = await Promise.all(
      entities.map(
        async entity => await ArticleDto.fromArticle(entity, fetchUsers)
      )
    )

    return dtos
  }

  title: string

  content: string

  userId: string

  user?: UserDto

  createdAt?: Date

  slug?: string
}

export default ArticleDto
