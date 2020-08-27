/**
 * Awooing.moe Backend
 * 2020 Vottus
 *
 * File: index.ts
 *
 */

/** Imports */

import { mongoUri } from './config'
import { connect as dbConnect, connection, Connection } from 'mongoose'
import { ApolloServer } from 'apollo-server'

import typeDefs from './gql/typeDefs'
import resolvers from './gql/resolvers'
import { createLogger, format, transports } from 'winston'

import path from 'path'

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

class Awooing {
  mongo: Connection = connection
  server: ApolloServer = new ApolloServer({ typeDefs, resolvers })

  constructor() {
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
      logger.error(
        '[MongoDB] Unable to connect to the MongoDB database ',
        e
      )
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
}

const awooing = new Awooing()
export default awooing
