import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import config from './config'
const secret: string = config.jwtSecret

function isAuthenticated(req: Request): Boolean {
    jwt.verify(getBearerToken(req).replace("Bearer ", ""), secret, (err: any, decoded: any) => {
        if (err) {
            return false
        } else {
            return true
        }
    });
    return false
}

function getDecodedString(req: Request): any {
    const token = getBearerToken(req)
    jwt.verify(token.replace("Bearer ", ""), secret, (err: any, decoded: any) => {
        if(err) {
            return null
        } else {
            return decoded
        }
    })
}

function getBearerToken(req: Request): string {
    const token = req.headers&&req.headers.authorization||""
    return token
}

function middleware(req: Request, res: Response, next: Function): void {
    if (isAuthenticated(req)) {
        next()
    } else {
        res.status(401)
        res.json({statusCode: 401, message: "access denied"})
    }
}

export default {
    isAuthenticated,
    getDecodedString,
    getBearerToken,
    middleware
}