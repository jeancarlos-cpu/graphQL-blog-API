const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { db: { posts }, pubsub }, info) => {
      const post = posts.find(post => postId === post.id && post.published);
      if (!post) throw new Error("post not found");

      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator("post");
    }
  }
};

module.exports = {
  Subscription
};
