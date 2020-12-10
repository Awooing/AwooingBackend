import { RouteGenericInterface } from 'fastify/types/route'

export type UserGetKind = 'id' | 'slug'

export const userGet = (kind: UserGetKind = 'id') => ({
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
