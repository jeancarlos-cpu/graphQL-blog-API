// const { RedisPubSub } = require("graphql-redis-subscriptions");
// const pubsub = new PubSub();
const { GraphQLServer } = require("graphql-yoga");
const { resolvers } = require("../resolvers/index.resolver");
const { prisma } = require("../prisma/generated/prisma-client/index");

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    prisma,
    req
  })
});

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log("it is working!");
});
