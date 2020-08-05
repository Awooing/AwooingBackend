/**
 * Awooing.moe Backend
 * 2020 Vottus
 *
 * File: index.ts
 *
 */

/** Imports */

// Configuration
import config from './config'

// Database
import * as mongoose from 'mongoose'

import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as fastifyJWT from 'fastify-jwt'
import * as fastifyRateLimit from 'fastify-rate-limit'
import { FastifyRateLimitOptions } from 'fastify-rate-limit'
import * as fastifyCors from 'fastify-cors'
import * as fastifyAuth from 'fastify-auth'
import userController from './controllers/userController'
import authentictePlugin from './plugins/authenticte-plugin'
import newsController from './controllers/newsController'
import articleController from './controllers/articleController'
import councilController from './controllers/councilController'

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({})

// server.register(mongooseModelPlugin)

server.register(fastifyAuth)
server.register(fastifyJWT, {
  secret: config.jwtSecret,
})
server.register(authentictePlugin)

server.register(fastifyRateLimit, {
  global: false,
  max: 1,
  timeWindow: 1000 * 60,
} as FastifyRateLimitOptions)

server.register(fastifyCors)

server.register(newsController)
server.register(articleController)
server.register(councilController)
server.register(userController)

const initServer = async () => {
  try {
    await server.listen(config.port, '0.0.0.0')
    console.log('[Awooing] [fastify] Server is running on port', config.port)
  } catch (err) {
    console.error('[Awooing] [Express] An error has occurred: ', err)
    server.log.error(err)
    process.exit(1)
  }
}

const initMongoDB = async () => {
  mongoose.connection
    .on('error', (error) =>
      console.error('[Awooing] [MongoDB] An error has occurred: ', error)
    )
    .on('disconnected', () =>
      console.log('[Awooing] [MongoDB] got disconnected')
    )
    .once('open', initServer)

  async function connectDb() {
    await mongoose.connect(
      `mongodb://localhost:27017/?readPreference=primary&&ssl=false`,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: false,
      }
    )
  }
  await connectDb()
  console.log(`[Awooing] [MongoDB] Connected successfully.`)
}

initMongoDB()
