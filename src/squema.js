const { gql } = require("apollo-server");

schema = gql`
  type Query {
    me: User!
    users(
      query: String
      first: Int
      skip: Int
      orderBy: UserOrderByInput
    ): [User]
    posts(
      query: String
      first: Int
      skip: Int
      orderBy: PostOrderByInput
    ): [Post]
    myPosts(
      query: String
      first: Int
      skip: Int
      orderBy: PostOrderByInput
    ): [Post]
    comments(first: Int, skip: Int, orderBy: CommentOrderByInput): [Comment]
    post(id: ID!): Post!
    uploads: [File]
  }

  type Mutation {
    createUser(data: CreateUserInput): userPayload!
    deleteUser(id: ID!): User!
    updateUser(data: updateUserInput): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    updatePost(id: ID!, data: updatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
    updateComment(id: ID!, data: updateCommentInput): Comment!
    login(data: userCredentialsInput!): userPayload!
    uploadFile(file: Upload!): Boolean!
  }

  input userCredentialsInput {
    email: String!
    password: String!
  }

  type userPayload {
    token: String!
    user: User!
  }

  type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload
    post: PostSubscriptionPayload
    myPost: PostSubscriptionPayload
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input updateUserInput {
    name: String
    email: String
    password: String
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
  }

  input updatePostInput {
    title: String
    body: String
    published: Boolean
  }

  input CreateCommentInput {
    text: String!
    post: ID!
  }

  input updateCommentInput {
    text: String
  }

  type User {
    id: ID!
    name: String!
    email: String
    password: String
    posts: [Post]
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  type PostSubscriptionPayload {
    mutation: MutationType
    node: Post
  }

  type CommentSubscriptionPayload {
    mutation: MutationType
    node: Comment
  }

  enum UserOrderByInput {
    name_ASC
    name_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }

  enum PostOrderByInput {
    title_ASC
    title_DESC
    body_ASC
    body_DESC
    published_ASC
    published_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }

  enum CommentOrderByInput {
    text_ASC
    text_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

module.exports = {
  schema
};
