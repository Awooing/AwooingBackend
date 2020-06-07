import { Router, Request, Response } from 'express'
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware'
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

// todo: re-enable the rate limit middleware

router.put('/', rateLimitMiddleware, async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")

    /*
    */
    if ((req.body !== null && req.body !== undefined) && (req.body.username !== null && req.body.username !== undefined) && (req.body.password !== null && req.body.password !== undefined)) {
        const user = await User.findOne({username: req.body.username})
        if (user === null || user === undefined) {
            const email = await User.findOne({email: req.body.email})
            if (email === null || email === undefined) {
                const user = User.create({
                    username: req.body.username,
                    email: req.body.email,
                    sluggedUsername: slugify(req.body.username, {lower: true}),
                    password: req.body.password,
                })
                ;(await user).save
                res.send({message: "success"})
            } else {
                res.send({errorCode: 400, message: "email is already used"})
            }
        } else {
            res.send({errorCode: 400, message: "username is already used"})
        }
    } else {
        res.send({errorCode: 400, message: "invalid request"})
    }
})

export default router