const express = require('express');
const profileRouter  = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const uploadCloud = require('../config/cloudinary.js');
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

   profileRouter.post("/edit",uploadCloud.single('photo'),(req,res,next) =>{
    const user = req.user;
    const {username,description,gender,status,password,passconfirm}=req.body;
    // console.log(req.file)
    // const imgPath = req.file;
    // if(imgPath==null || imgPath==undefined){
    //   imgPath="https://static.vix.com/es/sites/default/files/styles/large/public/btg/universos-2.jpg?itok=IpTWZVlD"
    // }
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