const express = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const auth = require('../auth')
const jwt = require('jsonwebtoken')

express.get('/byId/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (auth.isAuthenticated(req)) {
        res.send('authenticated, bitch')
    } else {
        res.send('not authenticated, bitch')
    }
})

express.get('/bySlug/:slug', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (auth.isAuthenticated(req)) {
        res.send('authenticated, bitch')
    } else {
        res.send('not authenticated, bitch')
    }
})

express.post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")

    const token = jwt.sign({jsi: "kokot"}, req.app.get("secret"), {expiresIn: "14d"})

    res.send({authenticated: token})

})

express.put('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    res.send({todo: "yes, me lazi"})
})

module.exports = express