/**
 * Awooing.moe Backend
 *
 * @author Project Awooing
 * @license PROPRIETARY
 */

/** Imports */

// Configuration
import { port, database } from './config'

// Database
import {
  Connection as MongooseConnection,
  connect,
  connection as mongoose,
} from 'mongoose'

import { hookFastify } from '@fasteerjs/fasteer'
import fastifyRateLimit from 'fastify-rate-limit'
import path from 'path'
import { err, frmt, mdb } from './console'

class Awooing {
  server = hookFastify({
    port,
    controllers: [
      path.join(__dirname, 'http', 'controllers', '*.controller.ts'),
    ],
    cors: true,
    helmet: true,
  })
  mongoose = mongoose

  startLoadTime = Date.now()
  finishLoadTime = 0

  constructor() {
    this.init()
  }

  async init() {
    await this.initDatabase()
    await this.initFastify()
    this.finishLoadTime = Date.now()

    this.logger().info(
      frmt(
        `Started Awooing Backend in ${
          this.finishLoadTime - this.startLoadTime
        }ms`
      )
    )
  }

  async initFastify() {
    try {
      await this.server.listen()
    } catch (_) {
      this.exit(1, 'Could not start Fastify!')
    }
  }

  async initDatabase() {
    this.mongoose
      .on('error', (e) => {
        this.logger().error(frmt(mdb(), err('Error:', e.message)))
        this.logger().error(e)
      })
      .on('disconnected', () =>
        this.logger().error(frmt(mdb(), err('Got disconnected!')))
      )

    this.logger().info(frmt(mdb(), 'Connecting...'))

    try {
      await connect(database, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: false,
      })
      this.logger().info(frmt(mdb(), 'Connected!'))
    } catch (e) {
      this.exit(1, 'Could not connect to MongoDB!')
    }
  }

  logger() {
    return this.server.logger
  }

  exit(code = 0, cause = 'Unknown') {
    const message = frmt('Shutting dowm with code', code, '| Cause:', cause)

    if (this.server.logger) this.logger().warn(message)
    else console.warn(message)

    process.exit(code)
  }
}

const awoo = new Awooing()
export default awoo
