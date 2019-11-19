const jwt = require("jsonwebtoken");
const secret = "fhdsjf978saf7dsfb110vvcs780432";

const generateToken = userId => {
  return jwt.sign({ userId }, secret, { expiresIn: "7 days" });
};

module.exports = {
  generateToken
};
