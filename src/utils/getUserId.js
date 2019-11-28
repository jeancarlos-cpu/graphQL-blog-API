const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getUserId = (req, authRequired = true) => {

  const token = req.req
    ? req.req.headers.authorization
    : req.connection.context.Authorization;
    
  if (token) {
    const decoded = jwt.verify(token, secret);
    return decoded.userId;
  }

  if (authRequired) {
    throw new Error("Authentication required");
  }

  return undefined;
};

module.exports = {
  getUserId
};
