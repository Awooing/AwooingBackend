import * as auth from '../managers/auth'
import User from '../models/User'
import slugify from 'slugify'
import * as argon2 from 'argon2'
import userHelper from '../managers/users'

import * as fp from 'fastify-plugin'
import parseBearerToken from 'parse-bearer-token'
import { Types } from 'mongoose'

export default fp(async (server, opts, next) => {
  server.get(
    '/user',
    {
      schema: {
        headers: {
          required: ['authorization'],
          type: 'object',
          properties: {
            authorization: { type: 'string' },
          },
        },
      },
      preHandler: [server.verifyGeneralUser, server.verifyCouncilUser],
    },
    async (req, reply) => {
      const token = (parseBearerToken(req as any) as any) as Types.ObjectId
      const user = await User.findById(token)
      if (user === null && user === undefined)
        return reply.send({
          errorCode: 1002,
          message: "token is invalid; user doesn't exist anymore",
        })
      reply.send(await userHelper.generateInformationPersonal(token))
    }
  )

  server.get(
    '/user/bySlug/:slug',
    {
      schema: {
        headers: {
          required: ['authorization'],
          type: 'object',
          properties: {
            authorization: { type: 'string' },
          },
        },
      },
    },
    async (req, res) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Content-Type', 'application/json')
      const user = await User.findOne({ sluggedUsername: req.params.slug })
      if (user == null)
        return res.send({ errorCode: 1003, message: 'user not found' })
      const token = parseBearerToken(req as any)
      if (token === user._id)
        return res.send(await userHelper.generateInformationPersonal(user._id))
      res.send(await userHelper.generateInformationGlobal(user._id))
    }
  )

  server.get(
    '/user/byId/:id',
    {
      schema: {
        headers: {
          required: ['authorization'],
          type: 'object',
          properties: {
            authorization: { type: 'string' },
          },
        },
      },
    },
    async (req, res) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Content-Type', 'application/json')
      const user = await User.findById(req.params.id)
      if (user === null || user === undefined)
        return res.send({ errorCode: 1003, message: 'user not found' })
      const token = parseBearerToken(req as any)
      if (token === user._id)
        return res.send(await userHelper.generateInformationPersonal(user._id))
      res.send(await userHelper.generateInformationGlobal(user._id))
    }
  )

  server.post(
    '/user',
    {
      schema: {
        body: {
          type: 'object',
          required: ['username', 'password'],
          properies: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
      config: {
        rateLimit: {
          timeWindow: 1000 * 30,
        },
      },
    },
    async (req, res) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Content-Type', 'application/json')
      const user = await User.findOne({ username: req.body.username })
      if (user === null || user === undefined)
        return res
          .send({ errorCode: 400, message: "user doesn't exist" })
          .status(400)
      if (!argon2.verify(user.password, req.body.password))
        return res
          .send({
            errorCode: 400,
            message: 'incorrect password',
          })
          .status(400)

      const token = server.jwt.sign(user._id.toString())
      res.send({ message: 'success', token: token })
    }
  )

  server.put(
    '/user',
    {
      schema: {
        body: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properies: {
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
      config: {
        rateLimit: {
          timeWindow: 1000 * 30,
        },
      },
    },
    async (req, res) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Content-Type', 'application/json')
      const UserByUsername = await User.findOne({
        username: req.body.username,
      }).exec()

      if (UserByUsername !== null)
        return res.send({ errorCode: 400, message: 'username is already used' })
      const email = await User.findOne({ email: req.body.email })
      if (email !== null)
        return res.send({ errorCode: 400, message: 'email is already used' })
      const CreateUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        sluggedUsername: slugify(req.body.username, { lower: true }),
        password: req.body.password,
      })
      await CreateUser.save()
      res.send({ message: 'success' })
    }
  )
})
