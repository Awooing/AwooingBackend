import axios, { AxiosResponse } from 'axios'
import config from '../config'

async function getUserById(discordId: string): Promise<any> {
        const response = await axios.get(`https://discord.com/api/v6/users/${discordId}`, {
            headers: {
                Authorization: `Bot ${config.botToken}`
            }
        })
        return response
}

async function getAvatarUrlById(discordId: string): Promise<String> {
    const user = await getUserById(discordId)
    if (user === null || user === undefined) return ""
    return genUrl(discordId, user.data.avatar)
}

function genUrl(discordId: string, avatarId: string): string {
    return `https://cdn.discordapp.com/avatars/${discordId}/${avatarId}`
}

export default {
    getAvatarUrlById,
    getUserById
}