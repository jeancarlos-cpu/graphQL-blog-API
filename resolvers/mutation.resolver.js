const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  deleteUser: async (parent, { id }, { prisma }, info) => {
    const userExists = await prisma.$exists.user({ id });
    if (!userExists) throw new Error("user not found.");
    return prisma.deleteUser({ id });
  },
  updateUser: async (parent, { id, data }, { prisma }, info) => {
    const emailTaken = await prisma.$exists.user({ email: data.email });
    const userExists = await prisma.$exists.user({ id });
    if (!userExists) throw new Error("user not found.");
    if (data.email && emailTaken) throw new Error("Email taken.");
    return prisma.updateUser({ data, where: { id } });
  },
  createPost: async (parent, { data }, { prisma }, info) => {
    const userExists = await prisma.$exists.user({ id: data.author });
    if (!userExists) throw new Error("user not found.");
    return prisma.createPost({
      ...data,
      author: {
        connect: {
          id: data.author
        }
      }
    });
  },
  deletePost: async (parent, { id }, { prisma }, info) => {
    const postExists = await prisma.$exists.post({ id });
    if (!postExists) throw new Error("post not found");
    return prisma.deletePost({ id });
  },
  updatePost: async (parent, { id, data }, { prisma }, info) => {
    const postExists = await prisma.$exists.post({ id });
    if (!postExists) throw new Error("post not found");
    return prisma.updatePost({ data, where: { id } });
  },
  createComment: (parent, { data }, { prisma }, info) =>
    prisma.createComment({
      ...data,
      author: {
        connect: {
          id: data.author
        }
      },
      post: {
        connect: {
          id: data.post
        }
      }
    }),
  deleteComment: (parent, { id }, { prisma }, info) =>
    prisma.deleteComment({ id }),
  updateComment: (parent, { id, data }, { prisma }, info) =>
    prisma.updateComment({
      data,
      where: { id }
    })
};

module.exports = {
  Mutation
};
