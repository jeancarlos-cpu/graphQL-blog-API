const Query = {
  users: (parent, args, { prisma }, info) => {
    return prisma.users();
    // return args.query
    //   ? users.filter(user =>
    //       user.name.toLowerCase().includes(args.query.toLowerCase())
    //     )
    //   : users;
  },
  posts: (parent, args, { prisma }, info) => prisma.posts(),
    // args.query
    //   ? posts.filter(post =>
    //       post.title.toLowerCase().includes(args.query.toLowerCase())
    //     )
    //   : posts,
  comments: (parent, args, { db: { comments } }, info) => comments
};

module.exports = {
  Query
};
