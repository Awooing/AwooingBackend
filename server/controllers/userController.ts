import { Router, Request, Response } from 'express'
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware'
import authMiddleware from '../middlewares/authMiddleware'
import validate from '../middlewares/validObjectIdMiddleware'
import auth from '../auth'
import User from '../models/User'
import slugify from 'slugify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userHelper from '../user'
import { Types } from 'mongoose'

const router = Router()

router.get('/', authMiddleware, async (req: Request, res: Response) => {
    const _id = auth.getDecodedString(req)
    console.log(_id)
    const user = await User.findById(_id)
    if (user !== null && user !== undefined) {
        res.send(await userHelper.generateInformationPersonal(_id))
    } else {
        res.send({errorCode: 1002, message: "token is invalid; user doesn't exist anymore"})
    }
})

router.get('/byId/:id', validate, async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    const user = await User.findById(req.params.id)
    if (user !== null && user !== undefined) {
        if (auth.matchesCurrent(req, user._id)) {
            res.send(await userHelper.generateInformationPersonal(user._id))
        } else {
            res.send(await userHelper.generateInformationGlobal(user._id))
        }
    } else {
        res.send({errorCode: 1003, message: "user not found"})
    }
})

router.get('/bySlug/:slug', async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    const user = await User.findOne({sluggedUsername: req.params.slug})
    if (user !== null) {
        if (auth.matchesCurrent(req, user._id)) {
            res.send(await userHelper.generateInformationPersonal(user._id))
        } else {
            res.send(await userHelper.generateInformationGlobal(user._id))
        }
    } else {
        res.send({errorCode: 1003, message: "user not found"})
    }
})

router.post('/', rateLimitMiddleware(10), async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if ((req.body !== null && req.body !== undefined) && (req.body.username !== null && req.body.username !== undefined) && (req.body.password !== null && req.body.password !== undefined)) {
         const user = await User.findOne({username: req.body.username})
         if (user !== null && user !== undefined) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign(user._id.toString(), req.app.get("secret"))
                res.send({message: "success", token: token})
            } else {
                res.send({errorCode: 400, message: "incorrect password"})
            }
         } else {
            res.send({errorCode: 400, message: "user doesn't exist"})
         }
    } else {
        res.send({errorCode: 400, message: "invalid request"})
    }

})

router.put('/', rateLimitMiddleware(30), async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
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