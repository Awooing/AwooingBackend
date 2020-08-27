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

const initMongoDB = async () => {
  mongoose.connection
    .on('error', (error) =>
      console.error('[Awooing] [MongoDB] An error has occurred: ', error)
    )
    .on('disconnected', () =>
      console.log('[Awooing] [MongoDB] got disconnected')
    )

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
