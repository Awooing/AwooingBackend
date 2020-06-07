import { Types } from "mongoose"
import { Request, Response } from 'express'

import user from './models/User'
import auth from './auth'


// returns false if user doesn't exist,
// otherwise returns string role
function getUserRole(id: Types.ObjectId) {
    const u = user.findOne({_id: id})
    if (u.getQuery === null) {
        return null 
    } else {
        return u.getQuery().role
    }
}


// returns false if user doesn't exist,
// otherwise returns boolean
function isCouncilMember(id: Types.ObjectId) {
    const role = getUserRole(id)
    if (role === null) {
        return null
    } else {
        return role === "Council"
    }
}

// returns false if user doesn't exist,
// otherwise returns boolean
function isUser(id: Types.ObjectId) {
    const role = getUserRole(id)
    if (role === null) {
        return null
    } else {
        return role === "User"
    }
}

function middleware(req: Request, res: Response, next: Function): void {
    if (auth.isAuthenticated(req) && isCouncilMember(auth.getDecodedString(req))) {
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