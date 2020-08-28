import { ApolloError, ApolloServer, IResolvers } from 'apollo-server'
import * as argon2 from 'argon2'
import Jwt, { JwtPayload } from '../helpers/Jwt'
import Article, { IArticle } from '../../db/entity/Article'
import User from '../../db/entity/User'
import ArticleComment from '../../db/entity/ArticleComment'
import { ArticleRepository } from '../../db/repository/ArticleRepository'

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { token }) => {
      if (!token.valid) {
        console.log('invalid')
        return null
      }

      const payload = token.payload as JwtPayload

      const user = await User.findById(payload.userId)
      if (!user) {
        console.log('not found')
        return null
      }

      return user
    },
    articleById: async (_, { id }) => {
      const article = await Article.findById(id)
      if (!article) return null

      return article
    },
    articleBySlug: async (_, { slug: articleSlug }) => {
      const article = await Article.findOne(articleSlug)
      if (!article) return null

      return new ArticleRepository().getGqlResponse(article)
    },
  },
  Mutation: {
    login: async (_, { identifier, password }) => {
      let user = await User.findOne({ username: identifier })
      if (!user) {
        user = await User.findOne({ email: identifier })
        if (!user) {
          throw new ApolloError(
            'User by that username or email was not found.',
            'INVALID_USERNAME'
          )
        }
      }

      if (!argon2.verify(user.password, password)) {
        throw new ApolloError('The password is incorrect.', 'INVALID_PASSWORD')
      }

      const token = Jwt.sign({ userId: user.id })

      return {
        token,
      }
    },
    register: async (_, { username, email, password }) => {
      if (String(password).length < 6) {
        throw new ApolloError(
          'The password must have 6 or more characters.',
          'SHORT_PASSWORD'
        )
      }

      const byUsername = await User.findOne({ username })
      if (byUsername) {
        throw new ApolloError(
          'The username is already taken.',
          'USERNAME_TAKEN'
        )
      }

      const byEmail = await User.findOne({ email })
      if (byEmail) {
        throw new ApolloError('The email is already used.', 'EMAIL_USED')
      }

      const user = await User.create({
        username,
        email,
        password,
      })

      return true
    },
    resetPass: async (_, { email }) => {
      let user = await User.findOne({ email })
      if (!user) {
        throw new ApolloError("The email doesn't exist.", 'EMAIL_NOT_FOUND')
      }

      // todo: handling sending email

      return true
    },

    createArticle: async (_, { title, content }, { token }) => {
      if (!token.valid) return null
      const payload = token.payload

      const user = await User.findById(payload.userId)
      if (!user)
        throw new ApolloError('You are not logged in.', 'NOT_LOGGED_IN')

      if (user.role !== 'Admin')
        throw new ApolloError(
          "You don't have permissions to do this.",
          'UNAUTHORIZED'
        )

      const article = await Article.create({ title, content, userId: user.id })
      return article
    },

    editArticle: async (_, { id, title, content }, { token }) => {
      if (!token.valid) return null
      const payload = token.payload

      const user = await User.findById(payload.userId)
      if (!user) {
        throw new ApolloError('You are not logged in.', 'NOT_LOGGED_IN')
      }

      if (user.role !== 'Admin') {
        throw new ApolloError(
          "You don't have permission to do this.",
          'UNAUTHORIZED'
        )
      }

      let article = await Article.findOne({ id })
      if (!article) {
        throw new ApolloError("Article doesn't exist.", 'ARTICLE_NOT_FOUND')
      }

      const toUpdate: any = {}
      title && (toUpdate.title = title)
      content && (toUpdate.content = content)

      await article.update(toUpdate)

      return true
    },

    deleteArticle: async (_, { id }, { token }) => {
      if (!token.valid) return null
      const payload = token.payload

      const user = await User.findById(payload.userId)
      if (!user) {
        throw new ApolloError('You are not logged in.', 'NOT_LOGGED_IN')
      }

      if (user.role !== 'Admin') {
        throw new ApolloError(
          "You don't have permission to do this.",
          'UNAUTHORIZED'
        )
      }

      let article = await Article.findOne({ id })
      if (!article) {
        throw new ApolloError("Article doesn't exist.", 'ARTICLE_NOT_FOUND')
      }

      const comments = await ArticleComment.find({ articleId: article.id })
      if (comments) {
        for (const comment of comments) {
          await comment.deleteOne()
        }
      }

      await article.deleteOne()

      return true
    },

    createComment: async (_, { articleId, content }, { token }) => {
      if (!token.valid) return null
      const payload = token.payload

      const user = await User.findById(payload.userId)
      if (!user) {
        throw new ApolloError('You are not logged in.', 'NOT_LOGGED_IN')
      }

      const article = Article.findById(articleId)
      if (!article) {
        throw new ApolloError(
          "Article with that id doesn't exist.",
          'ARTICLE_NOT_FOUND'
        )
      }

      const comment = await ArticleComment.create({
        articleId,
        content,
        authorId: token.payload.userId,
      })

      return comment
    },
    deleteComment: async (_, { commentId }, { token }) => {
      if (!token.valid) return null
      const payload = token.payload

      const user = await User.findById(payload.userId)
      if (!user) {
        throw new ApolloError('You are not logged in.', 'NOT_LOGGED_IN')
      }

      const comment = await ArticleComment.findById(commentId)
      if (!comment) {
        throw new ApolloError('Article not found.', 'ARTICLE_NOT_FOUND')
      }

      await comment.deleteOne()

      return true
    },
  },
}

export default resolvers
