import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

function validate(req: Request, res: Response, next: NextFunction): void
{
    if (Types.ObjectId.isValid(req.params.id)) {
        next()
    } else {
        res.send({errorCode: 400, message: "invalid request"})
    }
}

export default validate