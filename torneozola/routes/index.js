const express = require('express');
const router  = express.Router();
const User = require("../models/User");
/* GET home page */
router.get('/', (req, res, next) => {
 const user = req.session.passport.user;
 User.findOne({_id:user}).then((user)=>{
      
  res.render('index',{user});
 })

});

module.exports = router;
