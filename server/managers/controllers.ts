import { Router, Request, Response } from 'express'
import cdn from '../models/repos/CdnRepo'

const router: Router = Router()

// Controllers
import articleController from '../controllers/articleController'
router.use('/article', articleController)

import userController from '../controllers/userController'
router.use('/user', userController)

import newsController from '../controllers/newsController'
router.use('/news', newsController)

import councilController from '../controllers/councilController'
router.use('/council', councilController)

router.get('/', (_req: Request, res: Response) => {
    res.send({
        message: "This is the Awooing.moe API",
        endpoints: {
            articles: {
                methods: ["GET"],
                endpoint: "/article"
            },
            news: {
                methods: ["GET", "POST", "PUT"],
                endpoint: "/news"
            },
            users: {
                methods: ["GET", "POST", "PUT"],
                endpoint: "/user"
            },
            council: {
                methods: ["GET"],
                endpoint: "/council"
            }
        },
        docs: "docs.awooing.moe"
    })
})

// Awoo Route doesn't have it's own controller as it's not important
router.get('/awoo', async (_req: Request, res: Response) => {
    res.send(await cdn.getRandomAwoo())
})

export default router