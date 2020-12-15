import { Fasteer as F } from '@fasteerjs/fasteer'
import { CdnFetcher } from '../../fetchers/cdn.fetcher'
import {
  CommonErrorResponses,
  errorRes,
  successRes,
} from '../helpers/response.helper'

export const routePrefix = '/awoo'

export const AwooController: F.FCtrl = async fastify => {
  fastify.get('/', async (_, res) => {
    try {
      const awoo = await new CdnFetcher().randomAwoo()
      return successRes({ awoo }, res)
    } catch (e) {
      console.log({ e })
      return errorRes(CommonErrorResponses.INTERNAL, res)
    }
  })
}

export default AwooController
