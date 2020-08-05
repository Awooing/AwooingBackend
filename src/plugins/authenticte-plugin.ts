import * as authHelps from '../managers/auth'
import * as fp from 'fastify-plugin'
import pasrseBearer from 'parse-bearer-token'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Types } from 'mongoose'

export default fp(async (fastify, opts, next) => {
  fastify.decorate('verifyCouncilUser', async function (
    req: FastifyRequest,
    reply: FastifyReply<unknown>,
    done: (err?: unknown) => void
  ) {
    const BearerToken = pasrseBearer(req as any)
    if (BearerToken === null)
      return done(new Error('Bearer token does not exist'))
    const tokenValue =
      (fastify.jwt.decode(BearerToken) as Types.ObjectId) || null
    if (tokenValue === null)
      return done(new Error('Bearer token value could not be found'))
    console.log('tokeval', tokenValue)
    const userRole = await authHelps.getUserRole(tokenValue)
    console.log('role', userRole)
    if (userRole !== 'Council') return done(new Error('not expected user type'))
    done()
  })

  fastify.decorate('verifyGeneralUser', async function (
    req: FastifyRequest,
    reply: FastifyReply<unknown>,
    done: (err?: unknown) => void
  ) {
    const BearerToken = pasrseBearer(req as any)
    if (BearerToken === null)
      return done(new Error('Bearer token does not exist'))
    const tokenValue =
      (fastify.jwt.decode(BearerToken) as Types.ObjectId) || null
    if (!tokenValue === null)
      return done(new Error('Bearer token value could not be found'))
    const userRole = await authHelps.getUserRole(tokenValue)
    if (userRole !== 'User') return done(new Error('not expected user type'))
    done()
  })

  next()
})
