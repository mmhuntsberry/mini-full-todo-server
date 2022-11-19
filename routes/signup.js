const express = require("express");
const router = express.Router();
const signupControllers = require("../controllers/signup");

router.post("/", signupControllers.create);

module.exports = router;
