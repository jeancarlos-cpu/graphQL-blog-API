const Post = {
  author: (parent, agrs, { prisma }, info) => prisma.post({ id: parent.id }).author(),
  comments: (parent, agrs, { db: { comments } }, info) =>
    comments.filter(comment => comment.post === parent.id)
};

module.exports = {
  Post
};
