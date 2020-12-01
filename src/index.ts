import { ApolloServer, IResolvers } from 'apollo-server'
import { all as merge } from 'deepmerge'
import { PrismaClient } from '@prisma/client'

import {
  typeDef as Author,
  resolvers as authorResolvers
} from './resolvers/book'

const typeDefs = [Author]
const resolvers: IResolvers = merge([{}, authorResolvers]) as IResolvers

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context ({ req }) {
    return { prisma }
  }
})

server
  .listen(process.env.PORT)
  .then(({ url }) => {
    console.log('Apollo started and now listen on ' + url)
  })
  .catch((err) => {
    throw err
  })
