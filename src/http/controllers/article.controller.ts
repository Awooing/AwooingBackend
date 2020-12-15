import { Types } from 'mongoose'
import Article, { articlePageCount } from '../../db/entity/Article'
import slugify from 'slugify'
import { Fasteer as F } from '@fasteerjs/fasteer'
import * as AS from '../schemas/article.schema'
import {
  CommonErrorResponses,
  ErrorKinds,
  errorRes,
  successRes,
} from '../helpers/response.helper'
import { useUserContext } from '../context/user.context'
import ArticleDto from '../../dto/db/ArticleDto'

export const routePrefix = '/article'

export const ArticleControllerErrors = {
  Common: {
    // All Endpoints
    UNKNOWN_ARTICLE: {
      kind: ErrorKinds.USER_INPUT,
      message: 'Unknown Article',
    },
    INVALID_OBJECTID: CommonErrorResponses.INVALID_OBJECTID,
  },
}

export const ArticleController: F.FCtrl = async server => {
  server.get<AS.List>('/list', { schema: AS.articleList }, async (req, res) => {
    const maxPerPage = req.query.perPage
    const articles = await Article.find()
      .skip(maxPerPage * (req.query.currentPage - 1))
      .limit(maxPerPage)
    successRes(
      {
        posts: await ArticleDto.fromArticles(articles, true),
        pageInfo: {
          current: req.query.currentPage,
          last: await articlePageCount(maxPerPage),
        },
      },
      res
    )
  })

  server.get<AS.GetById>(
    '/id/:id',
    { schema: AS.articleGet('id') },
    async (req, res) => {
      if (!Types.ObjectId.isValid(req.params.id))
        return errorRes(ArticleControllerErrors.Common.INVALID_OBJECTID, res)

      const article = await Article.findById(req.params.id)
      if (!article)
        return errorRes(ArticleControllerErrors.Common.UNKNOWN_ARTICLE, res)

      successRes({ article: await ArticleDto.fromArticle(article, true) }, res) // TODO: Make Dto
    }
  )

  server.get<AS.GetBySlug>(
    '/slug/:slug',
    { schema: AS.articleGet('slug') },
    async (req, res) => {
      const article = await Article.findOne({ slug: req.params.slug })
      if (!article)
        return errorRes(ArticleControllerErrors.Common.UNKNOWN_ARTICLE, res)

      successRes({ article: await ArticleDto.fromArticle(article, true) }, res) // TODO: Make Dto
    }
  )

  server.post<AS.ArticleUpdate>(
    '/article',
    {
      schema: AS.articleUpdate,
    },
    async (req, res) => {
      const ctx = await useUserContext(req, 'Admin')
      if (!ctx.success) return res.send(ctx)

      if (!Types.ObjectId.isValid(req.body.id))
        return errorRes(ArticleControllerErrors.Common.INVALID_OBJECTID, res)

      const article = await Article.findById(req.body.id)
      if (!article)
        return res.send(ArticleControllerErrors.Common.UNKNOWN_ARTICLE)

      await article.update({
        title: req.body.title,
        content: req.body.content,
        slug: slugify(req.body.title),
      })

      return successRes(
        {
          message: 'Updated',
        },
        res
      )
    }
  )

  server.put<AS.ArticleCreate>(
    '/article',
    {
      schema: AS.articleCreate,
    },
    async (req, res) => {
      const ctx = await useUserContext(req, 'Admin')
      if (!ctx.success) return res.send(ctx)

      const article = await Article.create({
        title: req.body.title,
        content: req.body.content,
        userId: ctx.payload.userId,
      })

      return successRes({
        message: 'Created',
        article: await ArticleDto.fromArticle(article, false),
      }) // TODO: Make Dto
    }
  )
}

export default ArticleController
