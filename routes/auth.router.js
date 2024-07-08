const express = require("express");
const { signUp } = require("../controllers/auth.controller");
router = express.Router();

router.route("/signup").post(signUp);

module.exports = router;
