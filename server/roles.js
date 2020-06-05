const User = require('./models/User')
const auth = require('./auth')


// returns false if user doesn't exist,
// otherwise returns string role
function getUserRole(id) {
    const user = User.findOne({_id: id})
    if (user === null) {
        return null 
    } else {
        return user.role
    }
}


// returns false if user doesn't exist,
// otherwise returns boolean
function isCouncilMember(id) {
    const role = getUserRole(id)
    if (role === null) {
        return null
    } else {
        return role === "Council"
    }
}

// returns false if user doesn't exist,
// otherwise returns boolean
function isUser(id) {
    const role = getUserRole(id)
    if (role === null) {
        return null
    } else {
        return role === "User"
    }
}

function middleware(req, res, next) {
    if (auth.isAuthenticated(req) && isCouncilMember(req)) {
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