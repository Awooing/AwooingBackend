import { RouteGenericInterface } from 'fastify/types/route'

export const articleList = {
  querystring: {
    required: ['perPage', 'currentPage'],
    type: 'object',
    properties: {
      perPage: {
        type: 'integer',
      },
      currentPage: {
        type: 'integer',
      },
    },
  },
}

export interface List extends RouteGenericInterface {
  Querystring: {
    perPage: number
    currentPage: number
  }
}

export type ArticleGetKind = 'id' | 'slug'

export const articleGet = (kind: ArticleGetKind = 'id') => ({
  params: {
    type: 'object',
    required: [kind],
    properties: {
      [kind]: {
        type: 'string',
      },
    },
  },
})

export interface GetById extends RouteGenericInterface {
  Params: {
    id: number
  }
}

export interface GetBySlug extends RouteGenericInterface {
  Params: {
    slug: string
  }
}

export const articleUpdate = {
  body: {
    type: 'object',
    required: ['id', 'title', 'content'],
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      content: { type: 'string' },
    },
  },
}

export interface ArticleUpdate extends RouteGenericInterface {
  Body: {
    id: string
    title: string
    content: string
  }
}

export const articleCreate = {
  body: {
    type: 'object',
    required: ['title', 'content'],
    properies: {
      title: { type: 'string' },
      content: { type: 'string' },
    },
  },
}

export interface ArticleCreate extends RouteGenericInterface {
  Body: {
    title: string
    content: string
  }
}
