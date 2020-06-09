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
import mongoose from 'mongoose'

// Express
import express from 'express'
import controller from './managers/controllers'
import cors from 'cors'
import bodyParser from 'body-parser'

/** Startup */

// MongoDB
const connection: mongoose.Connection = mongoose.connection
connection.on("error", error => console.error("[Awooing] [MongoDB] An error has occurred: ", error))

async function initMongoDB() {
    await mongoose.connect(`mongodb+srv://${config.username}:${config.password}@uwucluster-mtxvo.mongodb.net/${config.database}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`[Awooing] [MongoDB] Connected successfully.`)
}


// Express
const server: express.Application = express()
server.set("secret", config.jwtSecret)
server.use(cors())
server.use(bodyParser.json())
server.set('json spaces', 2)
server.use(controller)

async function initServer() {
    try {
        await server.listen(config.port)
        console.log("[Awooing] [Express] Server is running on port", config.port)
    } catch(e) {
        console.error("[Awooing] [Express] An error has occurred: ", e)
        process.exit(1)
    }
}

// Loading
async function load() {
    await initMongoDB()
    await initServer()
}

// Startup 
load()