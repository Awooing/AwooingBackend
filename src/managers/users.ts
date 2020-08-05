import User from '../models/User'
import { Types } from 'mongoose'

export interface UserInformation {
  userId?: Types.ObjectId
  username?: string
  sluggedUsername?: string
  showAs?: string
  joinDate?: Date
  location?: string
  role?: string
}

export interface DiscordState {
  linked?: boolean
  discordId?: any
}

export interface AccountState {
  active?: boolean
  emailVerified?: boolean
}

export interface PersonalUserInformation extends UserInformation {
  email?: string
  state: AccountState
  discord: DiscordState
}

async function generateInformationGlobal(id: Types.ObjectId): Promise<Object> {
  const user = await User.findById(id)
  return {
    userId: user?._id,
    username: user?.username,
    sluggedUsername: user?.sluggedUsername,
    showAs: user?.showAs,
    joinDate: user?.joinDate,
    location: user?.userLocation,
    role: user?.role,
  }
}

async function generateInformationPersonal(
  id: Types.ObjectId
): Promise<PersonalUserInformation> {
  const user = await User.findById(id)
  return {
    userId: user?._id,
    username: user?.username,
    sluggedUsername: user?.sluggedUsername,
    email: user?.email,
    showAs: user?.showAs,
    joinDate: user?.joinDate,
    location: user?.userLocation,
    state: {
      active: user?.active === 1,
      emailVerified: user?.emailVerified === 1,
    },
    discord: {
      linked: user?.discordId !== '0',
      discordId: user?.discordId !== '0' ? user?.discordId : null,
    },
    role: user?.role,
  }
}

export default {
  generateInformationGlobal,
  generateInformationPersonal,
}
