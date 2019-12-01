const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getUserId = (req, authRequired = true) => {
  const token = req.req.headers.authorization
    ? req.req.headers.authorization
    : req.connection.context.Authorization;
  console.log(token);

  if (token !== "null") {
    const decoded = jwt.verify(token, secret);
    return decoded.userId;
  }

  if (authRequired) {
    throw new Error("Authentication required");
  }

  return null;
};

module.exports = {
  getUserId
};
