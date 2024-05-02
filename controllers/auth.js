const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

module.exports = router;

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });

  router.post("/sign-up", async (req, res) => {
    res.send("Form submission accepted!");
    const userInDatabase = await User.findOne({ username: req.body.username });
if (userInDatabase) {
  return res.send("Username already taken.");
}
if (req.body.password !== req.body.confirmPassword) {
  return res.send("Password and Confirm Password must match");
}
  });