const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signupSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

signupSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.KEY
  );
  return token;
};
const User = mongoose.model("User", signupSchema);

module.exports = User;
