const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../src/utils/getUserId");
const secret = "fhdsjf978saf7dsfb110vvcs780432";

const Mutation = {
  createUser: async (parent, { data }, { prisma }, info) => {
    const emailTaken = await prisma.$exists.user({ email: data.email });
    if (emailTaken) throw new Error("Email taken.");
    const hash = await bcrypt.hash(data.password, 10);
    const user = await prisma.createUser({ ...data, password: hash });
    return {
      token: jwt.sign({ userId: user.id }, secret),
      user
    };
  },
  login: async (parent, { data }, { prisma }, info) => {
    const user = await prisma.user({ email: data.email });
    if (!user) throw new Error("credentials not found");
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("credentials not found");
    return {
      token: jwt.sign({ userId: user.id }, secret),
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
    return prisma.updateUser({ data, where: { id: userId } });
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
    return prisma.updatePost({ data, where: { id } });
  },
  createComment: async (parent, { data }, { prisma, req }, info) => {
    const userId = getUserId(req);
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
