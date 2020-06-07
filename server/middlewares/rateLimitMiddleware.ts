import rateLimit, { Options } from 'express-rate-limit'


function limit(seconds: number) {
    const settings: Options = {
        windowMs: seconds * 1000,
        max: 1,
        message: {errorCode: 1001, message: 'rate limited', status: 429},
    }
    
    const limited: rateLimit.RateLimit = rateLimit(settings)
    return limited
}

export default limit