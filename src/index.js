const { GraphQLServer, PubSub } = require("graphql-yoga");
// const { RedisPubSub } = require("graphql-redis-subscriptions");
const { Query } = require("../resolvers/query.resolver");
const { Mutation } = require("../resolvers/mutation.resolver");
const { User } = require("../resolvers/user.resolver");
const { Post } = require("../resolvers/post.resolver");
const { Comment } = require("../resolvers/comment.resolver");
const { Subscription } = require("../resolvers/subscription.resolver");
let db = require("./db");
const { prisma } = require("../prisma/generated/prisma-client/index");

const pubsub = new PubSub();
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  User,
  Comment
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    prisma,
    pubsub
  }
});

server.start(() => {
  console.log("it is working!");
});
