import { Types } from "mongoose"
import { Request, Response } from 'express'

const user = require('./models/User')
const auth = require('./auth')


// returns false if user doesn't exist,
// otherwise returns string role
function getUserRole(id: Types.ObjectId) {
    const u = user.findOne({_id: id})
    if (u === null) {
        return null 
    } else {
        return u.role
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

function middleware(req: Request, res: Response, next: Function) {
    if (auth.isAuthenticated(req) && isCouncilMember(auth.getDecodedString())) {
        next()
    } else {
        res.status(401)
        res.json({statusCode: 401, message: "access denied"})
    }
}

module.exports = {
    getUserRole,
    isUser,
    isCouncilMember,
    middleware
}