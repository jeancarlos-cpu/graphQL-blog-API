const jwt = require("jsonwebtoken");

const generateToken = userId => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1000 ms" });
};

module.exports = {
  generateToken
};
