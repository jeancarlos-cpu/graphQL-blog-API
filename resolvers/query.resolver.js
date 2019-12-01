const { getUserId } = require("../src/utils/getUserId");

const Query = {
  me: (parent, args, { prisma, req }, info) => {
    const userId = getUserId(req);
    if (!userId) throw new Error("unable to query");
    return prisma.user({ id: userId });
  },
  users: (parent, args, { prisma }, info) =>{
    return prisma.users({
      where: {
        OR: [
          { name_contains: args.query },
          {
            id: args.query
          }
        ]
      },
      first: args.first,
      skip: args.skip,
      orderBy: args.orderBy
    })},
  posts: (parent, args, { prisma, req }, info) =>
    prisma.posts({
      where: {
        AND: [
          { published: true },
          {
            OR: [{ title_contains: args.query }, { body_contains: args.query }]
          }
        ]
      },
      first: args.first,
      skip: args.skip,
      orderBy: args.orderBy
    }),
  myPosts: (parent, args, { prisma, req }, info) => {
    const userId = getUserId(req);
    return prisma.posts({
      where: {
        AND: [
          { author: { id: userId } },
          {
            OR: [{ title_contains: args.query }, { body_contains: args.query }]
          }
        ]
      },
      first: args.first,
      skip: args.skip,
      orderBy: args.orderBy
    });
  },
  comments: (parent, args, { prisma }, info) =>
    prisma.comments({
      first: args.first,
      skip: args.skip,
      orderBy: args.orderBy
    }),
  post: async (parent, { id }, { prisma, req }, info) => {
    const userId = getUserId(req, false);
    const posts = await prisma.posts({
      where: {
        id,
        OR: [{ published: true }, { author: { id: userId } }]
      }
    });
    if (!posts.length) throw new Error("post not found");
    return posts[0];
  },
  uploads: (parent, args) => {}
};

module.exports = {
  Query
};
