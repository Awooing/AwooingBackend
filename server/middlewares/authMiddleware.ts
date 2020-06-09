import auth from '../managers/auth'
import { Request, Response, NextFunction } from 'express'

function authenticate(req: Request, res: Response, next: NextFunction) {
    auth.middlewareIn(req, res, next)
}

export default authenticate