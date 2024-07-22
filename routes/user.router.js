const express = require("express");
const { test, updateUser } = require("../controllers/user.controller");
const  verifyUser  = require("../utils/verifyUser");
router = express.Router();

router.route("/").get(test);
router.route("/updateUser/:id").post(verifyUser, updateUser);

module.exports = router;
