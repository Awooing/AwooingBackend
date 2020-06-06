import roles from '../roles'
import { Request, Response } from 'express'

function authorize(req: Request, res: Response, next: Function) {
    roles.middleware(req, res, next)
}

export default authorize