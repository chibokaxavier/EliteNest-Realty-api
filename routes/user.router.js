const express = require("express");
const { updateUser, deleteUser } = require("../controllers/user.controller");
const verifyUser = require("../utils/verifyUser");
router = express.Router();

router
  .route("/updateUser/:id")
  .post(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);
router
  .route("/deleteUser/:id")
  .post(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);

module.exports = router;
