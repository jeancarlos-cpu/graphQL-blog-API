const { Query } = require("./query.resolver");
const { Mutation } = require("./mutation.resolver");
const { User } = require("./user.resolver");
const { Post } = require("./post.resolver");
const { Comment } = require("./comment.resolver");
const { Subscription } = require("./subscription.resolver");

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Post,
    User,
    Comment
  };

  module.exports = {
      resolvers
  }