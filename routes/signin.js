const express = require("express");
const router = express.Router();
const signinControllers = require("../controllers/signin");

router.post("/", signinControllers.signin);

module.exports = router;
