const express = require("express");
const {
  signUp,
  signIn,
  googleSignIn,
  signOut,
} = require("../controllers/auth.controller");
router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/google").post(googleSignIn);
router.route("/signOut/:id").post(signOut);
module.exports = router;
