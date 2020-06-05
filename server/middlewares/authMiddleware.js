const auth = require('../auth')

function authenticate(req, res, next) {
    auth.middleware(req, res, next)
}

module.exports = authenticate