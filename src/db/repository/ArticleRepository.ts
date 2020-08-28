import Article, { IArticle } from '../entity/Article'
import { IUser } from '../entity/User'

export class ArticleRepository {
  async findAll(): Promise<IArticle[]> {
    const articles = await Article.find()
    return articles
  }

  async findPaginated(page: number): Promise<IArticle[]> {
    if (page <= 0) page = 1
    const articles = Article.find()
      .skip(10 * (page - 1))
      .limit(10)

    return articles
  }

  async findByAuthor(author: IUser): Promise<IArticle[]> {
    const articles = await Article.find({ author: author.id })

    return articles
  }

  async findBySlug(slug: string): Promise<IArticle | null> {
    const article = Article.findOne({ slug })
    return article ?? null
  }

  async findPageCount(perPage: number) {
    const articles = await Article.find()
    const count = articles.length

    if (count < 1) return 0
    if (count < perPage) return 1

    return Math.ceil(count / perPage)
  }
}
