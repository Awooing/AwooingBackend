import { Types } from 'mongoose'
import Article from '../models/Article'
import slugify from 'slugify'
import * as fp from 'fastify-plugin'
import parseBearerToken from 'parse-bearer-token'

export default fp(async (server, opts, next) => {
  server.get('/article/byid/:id', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*')
    reply.header('Content-Type', 'application/json')
    if (!Types.ObjectId.isValid(request.params.id))
      return reply.send({ statusCode: 400, error: 'id is invalid' }).status(404)
    const article = await Article.findOne({ _id: request.params.id }).exec()
    if (article === null)
      return reply
        .send({ statusCode: 404, error: "article doesn't exist" })
        .status(404)
    reply.send(article)
  })

  server.get('/article/byslug/:slug', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')
    if (req.params.slug === null)
      return res.send({ statusCode: 400, error: 'slug is missing' }).status(404)
    const article = await Article.findOne({ slug: req.params.slug }).exec()
    if (article === null)
      return res
        .send({ statusCode: 404, error: "article doesn't exist" })
        .status(404)
    res.send(article)
  })

  server.post(
    '/article',
    {
      schema: {
        headers: {
          required: ['authorization'],
          type: 'object',
          properties: {
            authorization: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['id', 'title', 'content'],
          properies: {
            id: { type: 'string' },
            title: { type: 'string' },
            content: { type: 'string' },
          },
        },
      },
      preHandler: [server.verifyCouncilUser],
    },
    async (req, res) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Content-Type', 'application/json')
      if (!Types.ObjectId.isValid(req.body.id))
        return res.send({ statusCode: 422, error: 'invalid request' })
      const article = await Article.findById(req.body.id)
      if (article === null)
        return res.send({ statusCode: 422, error: 'invalid request' })
      await article.update({
        title: req.body.title,
        content: req.body.content,
        slug: slugify(req.body.title),
      })
      res.send({ statusCode: 200, message: 'updated' })
    }
  )

  server.put(
    '/article',
    {
      schema: {
        headers: {
          required: ['authorization'],
          type: 'object',
          properties: {
            authorization: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['title', 'content'],
          properies: {
            title: { type: 'string' },
            content: { type: 'string' },
          },
        },
      },
      preHandler: [server.verifyCouncilUser],
    },
    async (req, res) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Content-Type', 'application/json')
      const possible = await Article.findOne({
        slug: slugify(req.body.title, { lower: true }),
      }).exec()
      if (possible !== null && possible !== undefined)
        return res
          .send({
            statusCode: 400,
            error: 'article by that name already exists',
          })
          .status(400)

      const userId = server.jwt.decode(
        parseBearerToken(req as any) as string
      ) as string

      await new Article({
        title: req.body.title,
        content: req.body.content,
        userId,
        createdAt: new Date(),
        slug: slugify(req.body.title, { lower: true }),
      }).save()
      res.send({ message: 'success' })
    }
  )

  next()
})
