const express = require("express");
const router = express.Router();
const { countWords } = require("../controllers/textCounterController");

const authorize = require("../middlewares/authorize");

router.get("/words", [authorize], countWords);

module.exports = router;
