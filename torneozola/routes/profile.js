const express = require('express');
const profileRouter  = express.Router();
const User = require("../models/User");

profileRouter.get("/userProfile", (req, res, next) => {
     res.render("profile/userProfile");
   });

   module.exports = profileRouter;