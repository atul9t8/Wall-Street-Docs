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
              return res.status(201).send("New user created.");
            })
            .catch((err) => {
              return res
                .status(500)
                .send("Something went wrong! Please try again.");
            });
        });
      } else {
        return res.status(400).send("Account with this email already exists!");
      }
    } else {
      return res.status(400).send("Email and password both are required.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

const userLogin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user !== null) {
      const checkPass = bcrypt.compareSync(req.body.password, user.password);
      if (checkPass) {
        const token = user.generateJWT();
        return res.send({
          status: "success",
          token: token,
        });
      } else {
        return res.send({
          status: "failed",
          message: "Invalid password!!",
        });
      }
    } else {
      return res.send({
        status: "failed",
        message: "Invalid email!!",
      });
    }
  } catch (err) {
    return res.send({
      status: "failed",
      message: "An error Occoured!! Please try again.",
    });
  }
};

module.exports = { userSignup, userLogin };
