import { CouncilMember } from '../../db/entity/CouncilMember'
import DiscordFetcher from '../../fetchers/discord.fetcher'

export class CouncilMemberDto {
  constructor(entity: CouncilMember, avatar?: string | null) {
    this.name = entity.name
    this.position = entity.position
    this.about = entity.about
    this.discordId = entity.discordId
    this.userId = entity.userId?.toHexString()

    if (avatar) this.avatar = avatar
  }

  static async fromMember(entity: CouncilMember, fetchAvatar = false) {
    if (fetchAvatar)
      return new this(
        entity,
        await new DiscordFetcher().avatarUrlById(entity.discordId)
      )
    return new this(entity)
  }

  static async fromMembers(entities: CouncilMember[], fetchAvatars = false) {
    const dtos = Promise.all(
      entities.map(async entity =>
        CouncilMemberDto.fromMember(entity, fetchAvatars)
      )
    )

    return dtos
  }

  name: string

  position: string

  about: string

  discordId: string

  avatar?: string

  userId?: string
}

export default CouncilMemberDto
