import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    me: User
    articleById(id: ID!): Article
    articleBySlug(slug: String!): Article
  }

  type Mutation {
    login(identifier: String!, password: String): LoginResult
    register(username: String!, email: String!, password: String!): Boolean
    resetPass(email: String!): Boolean
    createArticle(title: String!, content: String!): Boolean
    editArticle(id: ID!, title: String, content: String): Boolean
    deleteArticle(id: ID!): Boolean
  }

  type LoginResult {
    token: String!
  }

  type User {
    id: ID!
    username: String
    sluggedUsername: String
    showAs: String
    email: String
    createdAt: String
    active: Boolean
    emailVerified: Boolean
    role: String
    discordId: String
    joinDate: String
    location: String
  }

  type Applicant {
    id: ID!
    name: String
    content: String
  }

  type Article {
    id: ID!
    title: String
    slug: String
    content: String
    author: User
    createdAt: String
  }

  type CouncilMember {
    id: ID!
    name: String
    position: String
    about: String
    discordId: String
    userId: String
  }

  type Emote {
    id: ID!
    name: String
    discordUrl: String
    identifier: String
  }

  type PostComment {
    id: ID!
    post: Article
    author: User
    content: String
    createdAt: String
  }

  type ProfileComment {
    id: ID!
    profile: User
    author: User
    content: String
    createdAt: String
  }

  type Verification {
    id: ID!
    userId: String
    token: String
    type: String
  }

  type VoteStatistic {
    id: ID!
    applicant: String
    votes: String
  }
`

export default typeDefs
