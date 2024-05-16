const express = require("express");
const router = express.Router();
const {
  countWords,
  countCharacters,
} = require("../controllers/textCounterController");

const authorize = require("../middlewares/authorize");

router.get("/words", [authorize], countWords);
router.get("/character", [authorize], countCharacters);

module.exports = router;
