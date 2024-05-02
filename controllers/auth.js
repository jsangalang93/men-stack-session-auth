const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/sign-up", (req, res) => {
    res.render("sign-up.ejs");
  });