const express = require("express");
router = express.Router();

router.route("/").get((req, res) => {
  res.json({ message: "Success" });
});

module.exports = router;
