const express = require('express');
const profileRouter = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const uploadCloud = require('../config/cloudinary.js');
const bcryptSalt = 10;

profileRouter.get("/userProfile", (req, res, next) => {
  const user = req.user;
  const news = [];
  User.findOne({ _id: user }).then((user) => {
    user.news.map((id) => {
      Post.findById({ _id: id }).then((article) => {
        news.push(article);
      })
    })
  }).then(() => {
    res.render("profile/userProfile", { user, news });

  })
});

profileRouter.get("/edit", (req, res, next) => {
  const user = req.user;
  User.findOne({ _id: user }).then((user) => {
    res.render("profile/edit", { user });
  })
});

profileRouter.post("/edit", uploadCloud.single('photo'), (req, res, next) => {
  const user = req.user;
  let img = req.file;
  console.log(req.body.photo, '<--------')
  let image = {};
  if (img == undefined) {
    image = req.body.photo;
  }
  else {
    image = img.secure_url;
  }
  const { username, description, gender, status, password, passconfirm } = req.body;
  if (password != passconfirm) {
    res.render("profile/edit", { message: "Wrong password", user });
  }

  else if (password) {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    User.findOneAndUpdate({ _id: user }, { "username": username, "description": description, "gender": gender, "status": status, "password": hashPass, "profilePhoto": image }).then(() => {
      res.redirect("/profile/userProfile");
    })
  }
  else {
    User.findOneAndUpdate({ _id: user }, { "username": username, "description": description, "gender": gender, "status": status, "profilePhoto": image }).then(() => {
      res.redirect("/profile/userProfile");
    });
  }
});

profileRouter.get("/userProfile/:id", (req, res, next) => {
  const userId = req.params.id;
  const news = [];
  User.findOne({ _id: userId }).then((user) => {
    user.news.map((id) => {
      Post.findById({ _id: id }).then((article) => {
        news.push(article);
      })
    })
  }).then((user) => {
    res.render("profile/userProfile", { user, news });
  })
});


module.exports = profileRouter;