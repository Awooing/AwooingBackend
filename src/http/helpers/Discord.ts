import axios, { AxiosInstance } from 'axios'
import { botToken } from '../../config'

type DiscordUserObject = {
  id: string
  username: string
  discriminator: string
  avatar: string
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  locale?: string
  verified?: boolean
  email?: string
  flags?: number
  premium_type?: number
  public_flags?: number
}

export class Discord {
  axios: AxiosInstance = axios

  constructor() {
    this.axios.defaults.headers = {
      Authorization: `Bot ${botToken}`,
    }
  }

  async getUserByDiscordId(id: string): Promise<DiscordUserObject | null> {
    const response = await this.axios.request<DiscordUserObject>({
      url: `https://discord.com/api/v6/users/${id}`,
    })

    return response.status === 200 ? response.data : null
  }

  async getAvatarUrlById(id: string) {
    const user = await this.getUserByDiscordId(id)
    if (!user) return null

    return this.getAvatarUrl(user)
  }

  getAvatarUrl(response: DiscordUserObject) {
    return `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}`
  }
}

export default Discord
