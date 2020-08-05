import user from '../models/User'
import { Types } from 'mongoose'

/**
 * returns empty string "" if user doesn't exist.
 *
 *  if user exists return user role.
 *
 *  user role can be "User" or "Council" or ""
 */
export async function getUserRole(id: Types.ObjectId): Promise<string | Error> {
  // if (isValidObjectId(id)) return new Error("id is not a objectId")
  const u = await user.findOne({ _id: id })
  if (u === null || u === undefined || u.role === null) return ''
  const role = u.role as string
  return role
}
