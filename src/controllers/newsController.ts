import Article from '../models/Article'
import * as fp from 'fastify-plugin'

export default fp(async (server, opts, next) => {
  server.get('/news', async (request, reply) => {
    const maxPerPage = Number.parseInt(request.query.perPage.toString())
    const articles = await Article.find()
      .skip(
        maxPerPage * (Number.parseInt(request.query.currentPage.toString()) - 1)
      )
      .limit(maxPerPage)
    reply.send({
      news: articles,
      pageInfo: {
        current: request.query.currentPage,
        last: await getPageCount(maxPerPage),
      },
    })
  })
})

async function getPageCount(perPage: number) {
  const articles = await Article.find()
  const count = articles.length
  if (articles === null || articles === undefined) return 0
  if (
    count === null ||
    count === undefined ||
    perPage === null ||
    perPage === undefined
  )
    return 0
  if (count < 1) {
    return 0
  } else if (count < perPage) {
    return 1
  } else {
    return Math.ceil(count / perPage)
  }
}
