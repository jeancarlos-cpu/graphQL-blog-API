const Post = {
  author: (parent, agrs, { prisma }, info) =>
    prisma.post({ id: parent.id }).author(),
  comments: (parent, agrs, { prisma }, info) =>
    prisma.post({ id: parent.id }).comments()
};

module.exports = {
  Post
};
