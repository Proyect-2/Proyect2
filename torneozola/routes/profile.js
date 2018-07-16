const express = require('express');
const profileRouter  = express.Router();
const User = require("../models/User");

profileRouter.get("/userProfile", (req, res, next) => {
  const user = req.session.passport.user;
 User.findOne({_id:user}).then((user)=>{
  res.render("profile/userProfile",{user});
 })
   });

   profileRouter.get("/edit",(req,res,next) =>{
    const user = req.session.passport.user;
    User.findOne({_id:user}).then((user)=>{
     res.render("profile/edit",{user});
    })
   });

   module.exports = profileRouter;