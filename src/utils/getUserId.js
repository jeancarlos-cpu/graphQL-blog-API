const jwt = require("jsonwebtoken");
const secret = "fhdsjf978saf7dsfb110vvcs780432";

const getUserId = (req, authRequired = true) => {
  const token = req.request.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, secret);
    return decoded.userId;
  }

  if (authRequired) {
    throw new Error("Authentication required");
  }

  return null
};

module.exports = {
  getUserId
};
