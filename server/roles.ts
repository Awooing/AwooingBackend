import { Types } from "mongoose"
import { Request, Response } from 'express'

import user from './models/User'
import auth from './auth'

async function getUserRole(id: Types.ObjectId): Promise<any> {
    const u = await user.findOne({_id: id})
    return u?.role
}


// returns false if user doesn't exist
async function isCouncilMember(id: Types.ObjectId): Promise<Boolean> {
    const role = await getUserRole(id)
    if (role === null || role === undefined) {
        return false
    } else {
        return role === "Council"
    }
}

// returns false if user doesn't exist
async function isUser(id: Types.ObjectId): Promise<Boolean> {
    const role = await getUserRole(id)
    if (role === null) {
        return false
    } else {
        return role === "User"
    }
}

async function middleware(req: Request, res: Response, next: Function): Promise<void> {
    if (auth.isAuthenticated(req) && await isCouncilMember(new Types.ObjectId(auth.getDecodedString(req)))) {
        next()
    } else {
        res.status(401)
        res.json({statusCode: 401, message: "access denied"})
    }
}

export default {
    getUserRole,
    isUser,
    isCouncilMember,
    middleware
}