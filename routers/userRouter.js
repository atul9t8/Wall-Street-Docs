const express = require("express");
const router = express.Router();
const { userSignup } = require("../controllers/userController");

router.get("/", userSignup);

module.exports = router;
