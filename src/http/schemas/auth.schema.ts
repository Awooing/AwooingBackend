import { RouteGenericInterface } from 'fastify/types/route'

export interface Login extends RouteGenericInterface {
  Body: {
    username: string
    password: string
  }
}

export const authLogin = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
}

export interface Register extends RouteGenericInterface {
  Body: {
    username: string
    password: string
    repeat: string
  }
}

export const authRegister = {
  body: {
    type: 'object',
    required: [...authLogin.body.required, 'repeat'],
    properties: {
      ...authLogin.body.properties,
      repeat: {
        type: 'string',
      },
    },
  },
}
