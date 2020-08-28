import { IArticle } from '../entity/Article'
import ArticleComment, { IArticleComment } from '../entity/ArticleComment'

export class ArticleCommentRepository {
  async findAll(): Promise<IArticleComment[]> {
    const articles = await ArticleComment.find()

    return articles
  }

  async findPaginated(
    article: IArticle,
    page: number
  ): Promise<IArticleComment[]> {
    if (page <= 0) page = 1
    const articles = ArticleComment.find({ articleId: article.id })
      .skip(10 * (page - 1))
      .limit(10)

    return articles
  }

  async findByArticle(article: IArticle): Promise<IArticleComment[]> {
    const comments = await ArticleComment.find({ articleId: article.id })
    return comments
  }

  async findPageCount(article: IArticle, perPage: number) {
    const comments = await ArticleComment.find({ articleId: article.id })
    const count = comments.length

    if (count < 1) return 0
    if (count < perPage) return 1

    return Math.ceil(count / perPage)
  }
}

export default ArticleCommentRepository
