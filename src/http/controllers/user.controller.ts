import User from '../../db/entity/User'

import { Fasteer as F } from '@fasteerjs/fasteer'
import { useUserContext } from '../context/user.context'
import { ErrorKinds, errorRes, successRes } from '../helpers/response.helper'
import * as US from '../schemas/user.schema'
import UserDto from '../../dto/db/UserDto'

export const routePrefix = '/user'

export const UserControllerErrors = {
  Get: {
    UNKNOWN_USER: {
      kind: ErrorKinds.USER_INPUT,
      message: 'Unknown User',
    },
  },
}

export const UserController: F.FCtrl = async fastify => {
  fastify.get('/', async (req, res) => {
    const ctx = await useUserContext(req)
    if (!ctx.success) return res.send(ctx)

    return successRes({ user: ctx.dtoUser }, res)
  })

  fastify.get<US.GetBySlug>('/slug/:slug', async (req, res) => {
    const user = await User.findOne({
      sluggedUsername: req.params.slug,
    })

    if (!user) return errorRes(UserControllerErrors.Get.UNKNOWN_USER)

    return successRes({ user: UserDto.fromUser(user) }, res)
  })

  fastify.get<US.GetById>('/id/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) return errorRes(UserControllerErrors.Get.UNKNOWN_USER)

    return successRes({ user: UserDto.fromUser(user) }, res)
  })
}

export default UserController
