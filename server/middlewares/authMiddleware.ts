const Auth = require('../auth')
import { Request, Response } from 'express'

function authenticate(req: Request, res: Response, next: Function) {
    Auth.middleware(req, res, next)
}

module.exports = authenticate