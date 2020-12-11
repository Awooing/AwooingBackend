import { User, UserRole } from '../../db/entity/User'

export class UserDto {
  constructor(entity: User) {
    this.username = entity.username
    this.sluggedUsername = entity.sluggedUsername
    this.showAs = entity.showAs
    this.role = entity.role
    this.joinDate = entity.joinDate
  }

  public static fromUser(entity: User) {
    return new this(entity)
  }

  username: string

  sluggedUsername: string

  showAs: string

  role: UserRole

  joinDate: Date
}

export default UserDto
