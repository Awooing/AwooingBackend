import { Fasteer as F } from '@fasteerjs/fasteer'
import * as AS from '../schemas/auth.schema'
import User from '../../db/entity/User'
import { ErrorKinds, errorRes, successRes } from '../helpers/response.helper'
import argon from 'argon2'
import Jwt from '../helpers/jwt.helper'
import slugify from 'slugify'

export const routePrefix = '/auth'

export const UserControllerErrors = {
  Login: {
    UNKNOWN_USERNAME: {
      kind: ErrorKinds.USER_INPUT,
      message: 'Unknown Username',
    },
    INCORRECT_PASSWORD: {
      kind: ErrorKinds.USER_INPUT,
      message: 'Incorrect Password',
    },
  },
  Register: {
    USERNAME_TAKEN: {
      kind: ErrorKinds.USER_INPUT,
      message: 'Username is taken',
    },
  },
}

export const AuthController: F.FCtrl = async (fastify) => {
  fastify.post<AS.Login>(
    '/login',
    {
      schema: AS.authLogin,
      config: {
        rateLimit: {
          timeWindow: 1000 * 30,
        },
      },
    },
    async (req, res) => {
      const user = await User.findOne({ username: req.body.username })
      if (!user) return errorRes(UserControllerErrors.Login.UNKNOWN_USERNAME)

      if (!(await argon.verify(user.password, req.body.password)))
        return errorRes(UserControllerErrors.Login.INCORRECT_PASSWORD)

      const token = Jwt.create({ userId: user.id }, true)
      return successRes({ token, user }) // TODO: dto
    }
  )

  fastify.put<AS.Register>(
    '/register',
    { schema: AS.authRegister },
    async (req, res) => {
      const tempUser = await User.findOne({
        username: req.body.username,
      })

      if (tempUser)
        return errorRes(UserControllerErrors.Register.USERNAME_TAKEN)

      await User.create({
        username: req.body.username,
        showAs: req.body.username,
        sluggedUsername: slugify(req.body.username, { lower: true }),
        password: req.body.password,
        role: 'User',
        joinDate: new Date(),
      })

      return successRes({ message: 'success' })
    }
  )
}

export default AuthController
