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
      console.error('[Awooing] [MongoDB] An error has occurred: ', e)
    })
    this.mongo.on('disconnected', (e) => {
      console.warn('[Awooing] [MongoDB] Got disconnected!')
    })

    try {
      await dbConnect(mongoUri, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: false,
      })
      console.log(`[Awooing] [MongoDB] Connected successfully.`)
    } catch (e) {
      console.error(
        '[Awooing] [MongoDB] Unable to connect to the MongoDB database ',
        e
      )
    }
  }

  async initApollo() {
    try {
      const { url } = await this.server.listen()
      console.log(`[Awooing] [Apollo] Server is listening at ${url}`)
    } catch (e) {
        console.error("[Awooing] [Apollo] Unable to launch Apollo Server.")
    }
  }
}

const awooing = new Awooing()
export default awooing
