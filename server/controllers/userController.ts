import express, { Router } from 'express'
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const auth = require('../auth')
const jwt = require('jsonwebtoken')

const router = Router()

router.get('/byId/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (auth.isAuthenticated(req)) {
        res.send('authenticated, bitch')
    } else {
        res.send('not authenticated, bitch')
    }
})

router.get('/bySlug/:slug', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (auth.isAuthenticated(req)) {
        res.send('authenticated, bitch')
    } else {
        res.send('not authenticated, bitch')
    }
})

router.post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")

    const token = jwt.sign({jsi: "kokot"}, req.app.get("secret"), {expiresIn: "14d"})

    res.send({authenticated: token})

})

router.put('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    res.send({todo: "yes, me lazi"})
})

module.exports = router