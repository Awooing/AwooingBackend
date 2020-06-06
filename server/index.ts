import express from 'express'
import mongoose from 'mongoose'

const config = require('./config')

const connection: mongoose.Connection = mongoose.connection
connection.on("error", error => console.error("[Awooing] [MongoDB] An error has occurred: ", error))

// Express
const server: express.Application = express()
server.set("secret", config.jwtSecret)
server.use(require('cookie-parser')())
server.use(require('cors')())
server.use(require('body-parser').json())

// Controllers
const articleController = require('./controllers/articleController')
server.use('/article', articleController)

const userController = require('./controllers/userController')
server.use('/user', userController)

async function initMongoDB() {
    await mongoose.connect(`mongodb+srv://${config.username}:${config.password}@uwucluster-mtxvo.mongodb.net/${config.database}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`[Awooing] [MongoDB] Connected successfully.`)
}

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