const express = require("express");
const { test } = require("../controllers/user.controller");
router = express.Router();

router.route("/").get(test);

module.exports = router;
