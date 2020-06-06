import rateLimit from 'express-rate-limit'

const settings = {
    windowMs: 60 * 60 * 1000,
    max: 1,
    message: "too many registrations"
}

export default rateLimit(settings)