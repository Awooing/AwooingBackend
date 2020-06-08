import auth from '../auth'
import { Request, Response, NextFunction } from 'express'

function authenticate(req: Request, res: Response, next: NextFunction) {
    auth.middlewareOut(req, res, next)
}

export default authenticate