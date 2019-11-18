const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { prisma }, info) =>
      prisma.$subscribe.comment({
        mutation_in: ["CREATED", "UPDATED"],
        node: { post: { id: postId } }
      }),
    resolve: payload => payload
  },
  post: {
    subscribe: (parent, args, { prisma }, info) => prisma.$subscribe.post(),
    resolve: payload => payload
  }
};

module.exports = {
  Subscription
};
