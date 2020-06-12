import { Router, Request, Response } from 'express'
import Article from '../models/Article'
const router = Router()


router.get('/', async (req: Request, res: Response) => {
    console.log(req.body)
    if ((req.body !== null && req.body !== undefined) && (req.body.perPage !== null || req.body.perPage !== undefined) && (req.body.currentPage !== null && req.body.currentPage !== undefined)){
        const maxPerPage = req.body.perPage
        const articles = await Article.find().skip(maxPerPage*(req.body.currentPage-1)).limit(maxPerPage)
        res.send({
            news: articles,
            pageInfo: {
                current: req.body.currentPage,
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