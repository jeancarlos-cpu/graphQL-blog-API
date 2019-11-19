const { getUserId } = require("../src/utils/getUserId");
const User = {
  posts: async (parent, args, { prisma }, info) =>
    prisma.user({ id: parent.id }).posts({ where: { published: true } }),
  comments: (parent, args, { prisma }, info) =>
    prisma.user({ id: parent.id }).comments(),
  email: (parent, args, { prisma, req }, info) => {
    const userId = getUserId(req, false);
    if (userId && userId === parent.id) return parent.email;
    return null;
  },
  password: () => null
};

module.exports = {
  User
};
