import { FastifyRequest } from 'fastify'
import User, { User as DBUser, UserRole } from '../../db/entity/User'
import Jwt, { JwtPayload } from '../helpers/jwt.helper'
import {
  CommonErrorResponses,
  errorRes,
  ErrorResponse,
  ErrorKinds,
} from '../helpers/response.helper'

export type UserContextResponse = {
  success: true
  payload: JwtPayload
  user: DBUser
  // TODO: add field dtoUser when Dto for User is made
}

export const UserContextErrors = {
  MISSING_TOKEN: {
    kind: ErrorKinds.USER_INPUT,
    message: 'Missing or invalid authorization token',
  },
  ACCOUNT_INACTIVE: {
    kind: ErrorKinds.FORBIDDEN,
    message: 'Account that belongs to this token is inactive',
  },
  ACCOUNT_UNAUTHORIZED: CommonErrorResponses.ACCOUNT_UNAUTHORIZED,
}

export const useUserContext = async (
  req: FastifyRequest,
  verifyRole?: UserRole
): Promise<
  | UserContextResponse
  | ErrorResponse<typeof UserContextErrors[keyof typeof UserContextErrors]>
> => {
  const token = req.headers['authorization']
  if (!token || !String(token).startsWith('Bearer '))
    return errorRes(UserContextErrors.MISSING_TOKEN)

  const payload = Jwt.getPayload(token)
  if (!payload) return errorRes(UserContextErrors.MISSING_TOKEN)

  const user = await User.findById(payload.userId)
  if (!user) return errorRes(UserContextErrors.ACCOUNT_INACTIVE)

  if (verifyRole) {
    if (user.role !== verifyRole)
      return errorRes(UserContextErrors.ACCOUNT_UNAUTHORIZED)
  }

  return { success: true, payload, user } as UserContextResponse
}
