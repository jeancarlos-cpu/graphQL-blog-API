const { ApolloServer } = require("apollo-server");
const { resolvers } = require("../resolvers/index.resolver");
const { prisma } = require("../prisma/generated/prisma-client/index");
const { schema } = require("./squema");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: req => ({
    prisma,
    req
  })
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(console.log("its working!"));

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
// server.applyMiddleware({ app });
// app.listen(4000, () => console.log("server up."));
