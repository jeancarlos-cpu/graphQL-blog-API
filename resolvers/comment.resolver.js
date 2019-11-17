const Comment = {
  author: (parent, agrs, { db: { users } }, info) =>
    users.find(user => user.id === parent.author),
  post: (parent, agrs, { db: { posts } }, info) =>
    posts.find(post => post.id === parent.post)
};

module.exports = {
  Comment
};