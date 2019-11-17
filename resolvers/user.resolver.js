const User = {
  posts: async (parent, args, { prisma }, info) =>
    prisma.user({ id: parent.id }).posts(),
  comments: (parent, args, { prisma }, info) =>
    prisma.user({ id: parent.id }).comments()
};

module.exports = {
  User
};
