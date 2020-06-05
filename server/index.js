const env = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const connection = mongoose.connection;

env.config()

connection.on("error", error => console.log("An error has occurred in connection to the database: ", error))

// Express
const server = express();
server.set("secret", process.env.SECRET)
server.use(require("cookie-parser")());
server.use(require("cors")());
server.use(require("body-parser").json());

// Controllers
const articleController = require('./controllers/articleController')
server.use('/article', articleController)

const userController = require('./controllers/userController')
server.use('/user', userController)


async function initMongoDb() {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@uwucluster-mtxvo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    console.log("Connection to the database has been opened.")
}

async function initServer() {
    try {
        await server.listen(process.env.LISTEN_PORT)
        console.log(`Server is running at port ${process.env.LISTEN_PORT}`)
    } catch(e) {
        console.error("The server has encountered an error: ", e)
        process.exit(1)
    }
}

initMongoDb()
initServer()