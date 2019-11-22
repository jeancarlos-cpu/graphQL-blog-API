const { ApolloServer } = require("apollo-server");
const { resolvers } = require("../resolvers/index.resolver");
const { prisma } = require("../prisma/generated/prisma-client/index");
const { schema } = require("./squema");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: req => ({
    prisma,
    req
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(
    console.log("its working!")
)
