const errorHandler = require("./error");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized,No token"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // console.log(token);
    if (err) return next(errorHandler(403, "Forbiddden"));
    req.user = user;
    next()
  });
};

module.exports = verifyUser;

