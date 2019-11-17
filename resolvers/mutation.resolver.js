const uuid = require("uuid/v4");

const Mutation = {
  createUser: (parent, { data }, { db: { users } }, info) => {
    if (users.some(user => data.email === user.email)) {
      throw new Error("Invalid user credentials.");
    }

    const user = {
      id: uuid(),
      ...data
    };

    users.push(user);

    return user;
  },
  deleteUser: (parent, { id }, { db: { users, posts, comments } }, info) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error("user not found");

    const deletedUser = users.splice(userIndex, 1);

    posts = posts.filter(post => {
      const match = post.author === id;
      match
        ? (comments = comments.filter(comment => comment.post !== post.id))
        : null;
      return !match;
    });

    comments = comments.filter(comment => comment.author !== id);

    return deletedUser[0];
  },
  updateUser: (parent, { id, data }, { db: { users } }, info) => {
    const user = users.find(user => user.id === id);
    if (!user) throw new Error("user not found");

    const isEmailTaken = users.some(user => user.email === data.email);
    if (isEmailTaken) throw new Error("email is already taken");

    // data = JSON.parse(JSON.stringify(data));
    return Object.assign(user, data);
  },
  createPost: (parent, { data }, { db: { users, posts }, pubsub }, info) => {
    if (!users.some(user => data.author === user.id)) {
      throw new Error("user not found.");
    }

    const post = {
      id: uuid(),
      ...data
    };

    posts.push(post);
    post.published
      ? pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post
          }
        })
      : null;
    return post;
  },
  deletePost: (parent, { id }, { db: { posts, comments }, pubsub }, info) => {
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) throw new Error("post not found");
    const [deletedPost] = posts.splice(postIndex, 1);
    comments = comments.filter(comment => comment.post !== id);
    deletedPost.published
      ? pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: deletedPost
          }
        })
      : null;

    return deletedPost;
  },
  updatePost: (parent, { id, data }, { db: { posts }, pubsub }, info) => {
    const post = posts.find(post => id === post.id);
    if (!post) throw new Error("post not found");
    if (!data.published && post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "DELETED",
          data: post
        }
      });
    } else if (data.published && !post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: Object.assign(post, data)
        }
      });
    } else if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: Object.assign(post, data)
        }
      });
    }
    return Object.assign(post, data);
  },
  createComment: (
    parent,
    { data },
    { db: { users, posts, comments }, pubsub },
    info
  ) => {
    const userExists = users.some(user => user.id === data.author);
    const postExists = posts.some(
      post => post.id === data.post && post.published
    );

    if (!userExists || !postExists) {
      throw new Error("user or post not found");
    }

    const comment = {
      id: uuid(),
      ...data
    };

    comments.push(comment);

    pubsub.publish(`comment ${data.post}`, {
      comment: {
        mutation: "CREATED",
        payload: comment
      }
    });

    return comment;
  },
  deleteComment: (parent, { id }, { db: { comments }, pubsub }, info) => {
    const commentIndex = comments.findIndex(comment => comment.id === id);
    if (commentIndex === -1) throw new Error("comment not found");
    const [deletedComment] = comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: "DELETED",
        payload: deletedComment
      }
    });
    return deletedComment;
  },
  updateComment: (parent, { id, data }, { db: { comments }, pubsub }, info) => {
    const comment = comments.find(comment => id === comment.id);
    if (!comment) throw new Error("comment not found");
    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "UPDATED",
        payload: Object.assign(comment, data)
      }
    });
    return Object.assign(comment, data);
  }
};

module.exports = {
  Mutation
};
