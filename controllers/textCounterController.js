const Text = require("../models/textModel");

const getTextFromDB = async (userId) => {
  try {
    const text = await Text.findOne({ user: userId });
    return text ? text.text : null;
  } catch (error) {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

const countWords = async (req, res) => {
  try {
    let text = await getTextFromDB(req.user._id);
    if (text !== null) {
      const words = text.trim().split(/\s+/);
      const wordCount = words.length;
      return res.status(200).send({ TotalWord: wordCount });
    } else {
      return res.status(404).send("No text available. Create one first.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

const countCharacters = async (req, res) => {
  try {
    let text = await getTextFromDB(req.user._id);
    if (text !== null) {
      const characterCount = text.length;
      return res.status(200).send({ TotalCharacter: characterCount });
    } else {
      return res.status(404).send("No text available. Create one first.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

module.exports = { countWords, countCharacters };
