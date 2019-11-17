const Query = {
  users: (parent, args, { prisma }, info) => 
    prisma.users({
      where: {
        OR: [{ name_contains: args.query }, { email_contains: args.query }]
      }
    }),
  posts: (parent, args, { prisma }, info) =>
    prisma.posts({ where: { title_contains: args.query } }),
  comments: (parent, args, { prisma }, info) => prisma.comments()
};

module.exports = {
  Query
};
