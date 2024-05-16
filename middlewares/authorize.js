const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) {
    res.send({
      status: "failed",
      message: "No token found!!",
    });
  } else {
    token = token.split(" ")[1].trim();
    try {
      const decoded = jwt.verify(token, process.env.KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.send({
        status: "failed",
        message: "Unauthorize!!",
      });
    }
  }
};
