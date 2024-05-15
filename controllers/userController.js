const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const userSignup = async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      let userExist = await User.findOne({ email: req.body.email });
      if (userExist === null) {
        let user = new User({
          email: req.body.email,
        });
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.password = hash;
          user
            .save()
            .then(() => {
              return res.send({
                status: "success",
                message: "New user Created.",
              });
            })
            .catch((err) => {
              return res
                .status(500)
                .send("Something went wrong! Please try again.");
            });
        });
      }
    } else {
      return res.status(400).send("Email and password both are required.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

module.exports = { userSignup };
