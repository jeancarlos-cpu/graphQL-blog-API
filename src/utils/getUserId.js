const jwt = require("jsonwebtoken");
const secret = "fhdsjf978saf7dsfb110vvcs780432";

const getUserId = req => {
  const token = req.request.headers.authorization;
  if (!token) throw new Error("Authentication required");
  const decoded = jwt.verify(token, secret);
  return decoded.userId;
};

module.exports = {
  getUserId
};
