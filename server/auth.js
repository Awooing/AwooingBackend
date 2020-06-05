const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function isAuthenticated(req) {
    return jwt.verify(getBearerToken(req).replace("Bearer ", ""), req.app.get("secret"), function (err, decoded) {
        if(err) {
            return false
        } else {
            return true
        }
    });
}

function getDecodedString(req) {
    const token = getBearerToken(req)
    jwt.verify(token.replace("Bearer ", ""), req.app.get("secret"), function (err, decoded) {
        if(err) {
            return null
        } else {
            return decoded
        }
    })
}

function getBearerToken(req) {
    const token = req.headers&&req.headers.authorization||""
    return token
}

function middleware(req, res, next) {
    if (isAuthenticated(req)) {
        next()
    } else {
        res.status(401)
        res.json({statusCode: 401, message: "access denied"})
    }
}

module.exports = {
    isAuthenticated,
    getDecodedString,
    getBearerToken,
    middleware
}