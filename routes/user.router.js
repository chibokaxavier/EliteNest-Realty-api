const express = require("express");
const { test, updateUser } = require("../controllers/user.controller");
router = express.Router();

router.route("/").get(test);
router.route("/updateUser/:id").post(updateUser);

module.exports = router;
