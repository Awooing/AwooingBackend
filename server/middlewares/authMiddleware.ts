import auth from '../auth'
import { Request, Response } from 'express'

function authenticate(req: Request, res: Response, next: Function) {
    auth.middleware(req, res, next)
}

export default authenticate