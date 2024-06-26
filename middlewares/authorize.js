const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) {
    res.status(400).send("No token found!!");
  } else {
    token = token.split(" ")[1].trim();
    try {
      const decoded = jwt.verify(token, process.env.KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send("Unauthorized!!");
    }
  }
};
