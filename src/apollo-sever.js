const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { resolvers } = require("../resolvers/index.resolver");
const { prisma } = require("../prisma/generated/prisma-client/index");
const { schema } = require("./squema");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const csp = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'seft'"]
  }
});

const whitelist = ["https://jeancarlos-cpu.github.io/"];

const corsOptions = {
  origin: (origin, callback) =>
    whitelist.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error("Cross-origin resource sharing not allowed!"))
};

const app = express();
app.use(helmet());
app.use(csp);
// app.use(cors(corsOptions));
app.use(limiter);
app.use(compression());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: req => ({
    prisma,
    req
  })
});

server.applyMiddleware({ app });
app.listen(4000, () => console.log("server up."));

// server
//   .listen({ port: process.env.PORT || 4000 })
//   .then(console.log("its working!"));

// const app = express();
// // app.use("/text", (res, req) => {
// //   const file = path.join(__dirname, "files");
// //   req.download(file, () => {});
// // });
// app.get('/file', (req, res) => {
//   const file = "src/files/a.txt";
//   fs.readFile(file, (err, data) => {
//   console.log(data);
//   console.log(err);
//   res.download("src/files/enade.pdf", "enade.pdf");
//   });

// })
