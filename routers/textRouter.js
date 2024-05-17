const express = require("express");
const router = express.Router();
const {
  createOrUpdateText,
  deleteText,
} = require("../controllers/textController");

const authorize = require("../middlewares/authorize");

router.post("/", [authorize], createOrUpdateText);
router.delete("/delete", [authorize], deleteText);

module.exports = router;
