const roles = require('../roles')

function authorize(req, res, next) {
    roles.middleware(req, res, next)
}

module.exports = authorize