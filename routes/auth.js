const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
require('dotenv').config();
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/private",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.get("/private",(req, res, next) => {
  res.render("auth/private");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const age = req.body.age;
  const email = req.body.email
  console.log("insidee")
  if (username === "" || password === "" || age<18) {
    res.render("/auth/private", { message: "Indicate username and password" });
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("/auth/private", { message: "The username already exists" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      age:age,
      email:email
    });
    newUser.save((err) => {
      if (err) {
        console.log(err)
        res.render("/auth/private", { message: "Something went wrong" });
      } else {
        res.redirect("/private");
      }
    });
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/:le");
});

module.exports = authRoutes;
