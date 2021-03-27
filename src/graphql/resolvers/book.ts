import { gql } from 'apollo-server'

export const typeDef = gql`
extend type Query {
    books(): [Book!]!
}
type Book {
    id ID!
    name String!
    description String!
}
`

export const resolvers = {
  Query: {
    books () {
      return [{ id: '1', name: 'bite', description: 'a book' }]
    }
  }
}
