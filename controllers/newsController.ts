import { Router, Request, Response } from 'express'
import Article from '../models/Article'
const router = Router()


router.get('/', async (req: Request, res: Response) => {
    if ((req.query !== null && req.query !== undefined) && (req.query.perPage !== null && req.query.perPage !== undefined) && (req.query.currentPage !== null && req.query.currentPage !== undefined)){
        const maxPerPage = Number.parseInt(req.query.perPage.toString())
        const articles = await Article.find().skip(maxPerPage*(Number.parseInt(req.query.currentPage.toString())-1)).limit(maxPerPage)
        res.send({
            news: articles,
            pageInfo: {
                current: req.query.currentPage,
                last: await getPageCount(maxPerPage)
            }
        })
    } else {
        res.send({errorCode: 422, message: "invalid request"})
    }
})

async function getPageCount(perPage: number) {
    const articles = await Article.find()
    const count = articles.length
    if (articles === null || articles === undefined) {
        return 0
    } else {
        if ((count === null || count === undefined) || (perPage === null || perPage === undefined)) {
            return 0
        } else {
            if (count < 1) {
                return 0
            } else if(count < perPage) {
                return 1
            } else {
                return Math.ceil(count / perPage)
            }
        }
    }
} 

export default router
