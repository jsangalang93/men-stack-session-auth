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

  router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });

  router.post("/sign-in", async (req, res) => {
    res.send("Request to sign in received!");
      const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
    userInDatabase.password
    );
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }

    // There is a user AND they had the correct password. Time to make a session!
  // Avoid storing the password, even in hashed format, in the session
  // If there is other data you want to save to `req.session.user`, do so here!

    req.session.user = {
    username: userInDatabase.username,
  };

  res.redirect("/");
  });