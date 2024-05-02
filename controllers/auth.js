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
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }
    // Check if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }
    // Hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    // Create the user
    const user = await User.create(req.body);
    res.send(`Thanks for signing up ${user.username}`);
  });