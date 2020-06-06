import express, { Router, Request, Response } from 'express'
import rateLimitMiddleware from '../middlewares/registerRateLimitMiddleware'
import auth from '../auth'
import User from '../models/User'
import slugify from 'slugify'
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/byId/:id', async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (auth.isAuthenticated(req)) {
        res.send('authenticated, bitch')
    } else {
        res.send('not authenticated, bitch')
    }
})

router.get('/bySlug/:slug', async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (auth.isAuthenticated(req)) {
        res.send('authenticated, bitch')
    } else {
        res.send('not authenticated, bitch')
    }
})

router.post('/', async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    const token = jwt.sign({jsi: "kokot"}, req.app.get("secret"), {expiresIn: "14d"})
    res.send({authenticated: token})

})

router.put('/', rateLimitMiddleware, async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    const user = User.create({
        username: "Vottus2",
        email: "vottus@vottus.xyz",
        sluggedUsername: slugify("Vottus2", {lower: true}),
        password: "lol123",
    })
    ;(await user).save
    res.send({todo: "yes, me lazi"})
})

export default router