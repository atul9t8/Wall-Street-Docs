const Text = require("../models/textModel");

const createOrUpdateText = async (req, res) => {
  //it will create a new one if there is no text with this user id or it will update the existing text if user id exist for any text.
  try {
    let userExist = await Text.findOne({ user: req.user._id });
    if (userExist !== null) {
      userExist.text = req.body.text;
      await userExist.save();
      return res.status(200).send("Text updated.");
    } else {
      let text = new Text({
        text: req.body.text,
        user: req.user._id,
      });
      await text.save();
      return res.status(201).send("Text created.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

const deleteText = async (req, res) => {
  //it will delete text which was created by logged in user.
  try {
    let userExist = await Text.findOne({ user: req.user._id });
    if (userExist !== null) {
      await userExist.deleteOne();
      return res.status(200).send("Text Deleted.");
    } else {
      return res.status(404).send("No text available. Create one first.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

module.exports = { createOrUpdateText, deleteText };
