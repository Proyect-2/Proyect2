const express = require('express');
const profileRouter  = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

profileRouter.get("/userProfile", (req, res, next) => {
  const user = req.user;
 User.findOne({_id:user}).then((user)=>{
  res.render("profile/userProfile",{user});
 })
   });

   profileRouter.get("/edit",(req,res,next) =>{
    const user = req.user;
    User.findOne({_id:user}).then((user)=>{
     res.render("profile/edit",{user});
    })
   });

   profileRouter.post("/edit",(req,res,next) =>{
    const user = req.user;
    const {username,description,gender,status,password,passconfirm}=req.body;
    console.log(password)
    if (password !=passconfirm ) {
      res.render("profile/edit", { message: "Wrong password" ,user});
    }
    else if(password){
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
    User.findOneAndUpdate({_id:user},{"username":username,"description":description,"gender":gender,"status":status,"password":hashPass}).then(()=>{
     res.redirect("/profile/userProfile");
    })
  }
    else{
    User.findOneAndUpdate({_id:user},{"username":username,"description":description,"gender":gender,"status":status}).then(()=>{
      res.redirect("/profile/userProfile");
    })
    }
   });


   

   module.exports = profileRouter;