const express = require("express");
const router = express.Router();
const {
  countWords,
  countCharacters,
  countSentence,
  countParagraphs,
  longestWord,
} = require("../controllers/textCounterController");

const authorize = require("../middlewares/authorize");

router.get("/words", [authorize], countWords);
router.get("/character", [authorize], countCharacters);
router.get("/sentence", [authorize], countSentence);
router.get("/paragraph", [authorize], countParagraphs);
router.get("/longestWord", [authorize], longestWord);

module.exports = router;
