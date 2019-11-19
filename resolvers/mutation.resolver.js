const bcrypt = require("bcryptjs");
const { getUserId } = require("../src/utils/getUserId");
const { generateToken } = require("../src/utils/generateToken");
const { hashPassword } = require("../src/utils/hashPassword");

const Mutation = {
  createUser: async (parent, { data }, { prisma }, info) => {
    const emailTaken = await prisma.$exists.user({ email: data.email });
    if (emailTaken) throw new Error("Email taken.");
    const hash = await hashPassword(data.password);
    const user = await prisma.createUser({ ...data, password: hash });
    return {
      token: generateToken(user.id),
      user
    };
  },
  login: async (parent, { data }, { prisma }, info) => {
    const user = await prisma.user({ email: data.email });
    if (!user) throw new Error("credentials not found");
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("credentials not found");
    return {
      token: generateToken(user.id),
      user
    };
  },
  deleteUser: async (parent, args, { prisma }, info) => {
    const userId = getUserId(req);
    return prisma.deleteUser({ id: userId });
  },
  updateUser: async (parent, { data }, { prisma, req }, info) => {
    const userId = getUserId(req);
    const emailTaken = await prisma.$exists.user({ email: data.email });
    if (data.email && emailTaken) throw new Error("Email taken.");
    if (data.password) data.password = await hashPassword(data.password);
    return prisma.updateUser({
      data,
      where: { id: userId }
    });
  },
  createPost: async (parent, { data }, { prisma, req }, info) => {
    const userId = getUserId(req);
    const userExists = await prisma.$exists.user({ id: userId });
    if (!userExists) throw new Error("user not found.");
    return prisma.createPost({
      ...data,
      author: {
        connect: {
          id: userId
        }
      }
    });
  },
  deletePost: async (parent, { id }, { prisma, req }, info) => {
    const userId = getUserId(req);
    const postExists = await prisma.$exists.post({
      id,
      author: { id: userId }
    });
    if (!postExists) throw new Error("unable to delete post");
    return prisma.deletePost({ id });
  },
  updatePost: async (parent, { id, data }, { prisma, req }, info) => {
    const userId = getUserId(req);
    const postExists = await prisma.$exists.post({
      id,
      author: { id: userId }
    });
    if (!postExists) throw new Error("unable to update post");
    if (data.published !== undefined && !data.published)
      await prisma.deleteManyComments({ post: { id } });
    return prisma.updatePost({ data, where: { id } });
  },
  createComment: async (parent, { data }, { prisma, req }, info) => {
    const userId = getUserId(req);
    const isPostPublished = await prisma.$exists.post({
      id: data.post,
      published: true
    });
    if (!isPostPublished) throw new Error("unable to comment");
    return prisma.createComment({
      ...data,
      author: {
        connect: {
          id: userId
        }
      },
      post: {
        connect: {
          id: data.post
        }
      }
    });
  },
  deleteComment: async (parent, { id }, { prisma, req }, info) => {
    const userId = getUserId(req);
    const commentExists = await prisma.$exists.comment({
      id,
      author: { id: userId }
    });
    if (!commentExists) throw new Error("unable to delete comment");
    return prisma.deleteComment({ id });
  },
  updateComment: async (parent, { id, data }, { prisma, req }, info) => {
    const userId = getUserId(req);
    const commentExists = await prisma.$exists.comment({
      id,
      author: { id: userId }
    });
    if (!commentExists) throw new Error("unable to delete comment");
    return prisma.updateComment({
      data,
      where: { id }
    });
  }
};

module.exports = {
  Mutation
};
