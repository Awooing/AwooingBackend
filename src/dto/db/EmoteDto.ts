import { Emote } from '../entity/Emote'

export class EmoteDto {
  constructor(entity: Emote) {
    this.name = entity.name
    this.discordUrl = entity.discordUrl
    this.identifier = entity.identifier
  }

  static fromEmote(entity: Emote) {
    return new this(entity)
  }

  name: string

  discordUrl: string

  identifier: string
}
export default EmoteDto
