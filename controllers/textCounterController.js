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

const countSentence = async (req, res) => {
  try {
    let text = await getTextFromDB(req.user._id);
    if (text !== null) {
      const sentenceCount = (text.match(/[.!?]+/g) || []).length;
      return res.status(200).send({ TotalSentence: sentenceCount });
    } else {
      return res.status(404).send("No text available. Create one first.");
    }
  } catch {
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

const countParagraphs = async (req, res) => {
  try {
    let text = await getTextFromDB(req.user._id);
    if (text !== null) {
      let paragraphs = text.split(/\.+/);
      paragraphs = paragraphs.filter((paragraph) => paragraph.trim() !== "");
      const paragraphCount = paragraphs.length;
      return res.status(200).send({ TotalParagraph: paragraphCount });
    } else {
      return res.status(404).send("No text available. Create one first.");
    }
  } catch (error) {
    console.error("Error counting paragraphs:", error);
    return res.status(500).send("Something went wrong! Please try again.");
  }
};

const longestWord = async (req, res) => {
  try {
    let text = await getTextFromDB(req.user._id);
    if (text !== null) {
      const wordsArray = text.split(/\s+/).filter((word) => word.length > 0);

      const wordLengths = new Set(wordsArray.map((word) => word.length));
      const maxLength = Math.max(...wordLengths);

      const longestWords = [];

      for (const length of wordLengths) {
        if (length === maxLength) {
          const words = wordsArray.filter((word) => word.length === length);
          longestWords.push(words);
        }
      }
      return res.status(200).send({ longestWords: longestWords });
    } else {
      return res.status(404).send("No text available. Create one first.");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  countWords,
  countCharacters,
  countSentence,
  countParagraphs,
  longestWord,
};
