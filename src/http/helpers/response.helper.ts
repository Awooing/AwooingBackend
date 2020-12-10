import { FastifyReply } from 'fastify'

export interface BaseResponse {
  success: boolean
  error?: {
    kind: string
    message: string
  }
  data?: unknown
}

export const ErrorKinds = {
  USER_INPUT: 'user_input',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
}

export const CommonErrorResponses = {
  INVALID_OBJECTID: {
    kind: ErrorKinds.USER_INPUT,
    message: 'Invalid ObjectId',
  },
  ACCOUNT_UNAUTHORIZED: {
    kind: ErrorKinds.UNAUTHORIZED,
    message: 'Account not privileged to perform this action',
  },
}

export interface SuccessResponse<Data extends BaseResponse['data']>
  extends BaseResponse {
  success: true
  data: Data
}

export interface ErrorResponse<Error extends BaseResponse['error']>
  extends BaseResponse {
  success: false
  error: Error
}

export const successRes = <Data extends BaseResponse['data']>(
  data: Data,
  reply: FastifyReply | null = null,
  status = 200
): SuccessResponse<Data> => {
  const res: SuccessResponse<Data> = {
    success: true,
    data,
  }

  if (reply) reply.status(status).send(res)
  return res
}

export const errorRes = <Error extends BaseResponse['error']>(
  error: Error,
  reply: FastifyReply | null = null,
  status = 200
): ErrorResponse<Error> => {
  const res: ErrorResponse<Error> = {
    success: false,
    error,
  }

  if (reply) reply.status(status).send(res)
  return res
}
