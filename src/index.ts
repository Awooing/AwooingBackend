/**
 * Awooing.moe Backend
 * 2020 Vottus
 *
 * File: index.ts
 *
 */

/** Imports */

import { connect as dbConnect, connection, Connection } from 'mongoose'
import { ApolloServer } from 'apollo-server'
import { createLogger, format, transports } from 'winston'

import fs from 'fs'
import path from 'path'

import { mongoUri } from './config'
import typeDefs from './http/gql/typeDefs'
import resolvers from './http/gql/resolvers'
import Jwt from './http/helpers/Jwt'

const loggerFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`
})

export const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        loggerFormat
      ),
      handleExceptions: true,
    }),
    new transports.File({
      format: format.combine(format.timestamp(), loggerFormat),
      filename: path.join(__dirname, '../', 'logs', 'combined.log'),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../', 'logs', 'exceptions.log'),
    }),
  ],
})

export class Awooing {
  mongo: Connection = connection
  server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: Awooing.env() === 'development',
    context: ({ req }) => {
      return {
        token: {
          valid: Jwt.isValid(req.headers.authorization || ''),
          payload: Jwt.getPayload(req.headers.authorization || ''),
        },
        isAuthenticated: Boolean(req.headers.authorization),
      }
    },
  })

  constructor() {
    logger.info(`Starting Awooing Backend v${Awooing.version()}`)
    if (Awooing.env() === 'development') {
      logger.warn('The backend is running in development mode.')
    }
    this.init()
  }

  async init() {
    await this.initMongoDB()
    await this.initApollo()
  }

  async initMongoDB() {
    this.mongo.on('error', (e) => {
      logger.error('[MongoDB] An error has occurred: ', e)
    })
    this.mongo.on('disconnected', (e) => {
      logger.warn('[MongoDB] Got disconnected!')
    })

    try {
      await dbConnect(mongoUri, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: false,
      })
      logger.info(`[MongoDB] Connected successfully.`)
    } catch (e) {
      logger.error('[MongoDB] Unable to connect to the MongoDB database ', e)
    }
  }

  async initApollo() {
    try {
      const { url } = await this.server.listen()
      logger.info(`[Apollo] Server is listening at ${url}`)
    } catch (e) {
      logger.error('[Apollo] Unable to launch Apollo Server.')
    }
  }

  static version() {
    const pkg = path.join(__dirname, '..', 'package.json')
    return fs.existsSync(pkg)
      ? JSON.parse(fs.readFileSync(pkg, 'utf-8')).version || '3.0.0'
      : '3.0.0'
  }

  static env(): EnvironmentType {
    return (process.env.NODE_ENV as EnvironmentType) || 'production'
  }
}

type EnvironmentType = 'development' | 'production'

const awooing = new Awooing()
export default awooing
