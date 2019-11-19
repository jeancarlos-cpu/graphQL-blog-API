const { getUserId } = require("../src/utils/getUserId");

const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { prisma }, info) =>
      prisma.$subscribe.comment({
        mutation_in: ["CREATED", "UPDATED"],
        node: { post: { id: postId, published: true } }
      }),
    resolve: payload => payload
  },
  post: {
    subscribe: (parent, args, { prisma }, info) =>
      prisma.$subscribe.post({ node: { published: true } }),
    resolve: payload => payload
  },
  myPost: {
    subscribe: (parent, args, { prisma, req }, info) => {
      userId = getUserId(req);
      return prisma.$subscribe.post({ node: { author: { id: userId } } });
    },
    resolve: payload => payload
  }
};

module.exports = {
  Subscription
};
