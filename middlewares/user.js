const User = require("../models/userModel");

module.exports = async function (req, res, next) {
  if (req.body.id) {
    const userExist = await User.findById(req.body.id);
    if (userExist !== null) {
      if (req.body.id !== req.user._id) {
        res.send({
          status: "failed",
          message: "Unauthorized!!",
        });
      } else {
        next();
      }
    } else {
      res.send({
        status: "failed",
        message: "Forbidden!!",
      });
    }
  } else if (req.params.id) {
    //req.params.id added beacuse sometimes user id is pass through params in some API like get API, delete API etc.
    const userExist = await User.findById(req.params.id);
    if (userExist !== null) {
      if (req.params.id !== req.user._id) {
        res.send({
          status: "failed",
          message: "Unauthorized!!",
        });
      } else {
        next();
      }
    } else {
      res.send({
        status: "failed",
        message: "Forbidden!!",
      });
    }
  }
};
