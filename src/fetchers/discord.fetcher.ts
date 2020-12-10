import axios from 'axios'
import { botToken } from '../config'

export class DiscordFetcher {
  url = (discordId: string, avatarId: string) =>
    `https://cdn.discord.com/avatars/${discordId}/${avatarId}`

  userById = async (discordId: string) => {
    try {
      const res = await axios.request({
        method: 'GET',
        url: `https://discord.com/api/v8/users/${discordId}`,
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      })

      return res.data
    } catch (_) {
      return null
    }
  }

  avatarUrlById = async (discordId: string) => {
    try {
      return this.url(discordId, (await this.userById(discordId)).avatar)
    } catch (e) {
      return null
    }
  }
}

export default DiscordFetcher
