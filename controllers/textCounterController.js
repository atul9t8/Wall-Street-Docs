const Text = require("../models/textModel");

const countWords = async (req, res) => {
  try {
    let text = await Text.findOne({ user: req.user._id });
    if (text !== null) {
      let textFromDB = text.text;
      const words = textFromDB.trim().split(/\s+/);
      const wordCount = words.length;
      return res.status(200).send({ TotalWord: wordCount });
    } else {
      return res.status(404).send("No text available. Create one first.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

module.exports = { countWords };
