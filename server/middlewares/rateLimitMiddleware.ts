import rateLimit, { Options } from 'express-rate-limit'

const settings: Options = {
    windowMs: 30 * 1000,
    max: 1,
    message: {errorCode: 1001, message: 'rate limited', status: 429},
}

const limited: rateLimit.RateLimit = rateLimit(settings)

export default limited