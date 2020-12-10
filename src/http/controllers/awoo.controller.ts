import { Fasteer as F } from '@fasteerjs/fasteer'
import { CdnFetcher } from '../../fetchers/cdn.fetcher'
import { successRes } from '../helpers/response.helper'

export const routePrefix = '/awoo'

export const AwooController: F.FCtrl = async (fastify) => {
  fastify.get('/', async (req, res) => {
    const awoo = await new CdnFetcher().randomAwoo()

    return successRes({ awoo })
  })
}

export default AwooController
