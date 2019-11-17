const Comment = {
  author: (parent, agrs, { prisma }, info) =>
    prisma.comment({ id: parent.id }).author(),
  post: (parent, agrs, { prisma }, info) =>
    prisma.comment({ id: parent.id }).post()
};

module.exports = {
  Comment
};
