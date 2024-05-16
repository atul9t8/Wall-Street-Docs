const express = require("express");
const router = express.Router();
const { createOrUpdateText } = require("../controllers/textController");

const authorize = require("../middlewares/authorize");
const user = require("../middlewares/user");

router.post("/", [authorize], createOrUpdateText);

module.exports = router;
