import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import config from './config'
import { Types } from 'mongoose';
const secret: string = config.jwtSecret

function isAuthenticated(req: Request): any {
    return jwt.verify(getBearerToken(req).replace("Bearer ", ""), secret, (err: any, decoded: any) => {
        if (err) {
            return false
        } else {
            return true
        }
    });
}

function getDecodedString(req: Request): any {
    const token = getBearerToken(req)
    return jwt.verify(token.replace("Bearer ", ""), secret, (err: any, decoded: any) => {
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

function middlewareIn(req: Request, res: Response, next: NextFunction): void {
    if (isAuthenticated(req)) {
        next()
    } else {
        res.status(401)
        res.json({statusCode: 401, message: "access denied"})
    }
}

function middlewareOut(req: Request, res: Response, next: NextFunction): void {
    if (!isAuthenticated(req)) {
        next()
    } else {
        res.status(200)
        res.json({statusCode: 200, message: "already logged in"})
    }
}

function matchesCurrent(req: Request, id: Types.ObjectId) {
    if (isAuthenticated(req)) {
        return id.equals(getDecodedString(req))
    } else {
        return false
    }
}

export default {
    isAuthenticated,
    getDecodedString,
    getBearerToken,
    matchesCurrent,
    middlewareIn,
    middlewareOut
}