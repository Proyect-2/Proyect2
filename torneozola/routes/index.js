const express = require('express');
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
/* GET home page */
router.get('/', (req, res, next) => {
    if (req.session.passport != undefined) {
        const user = req.session.passport.user;
        User.findOne({ _id: user }).then((user) => {
            console.log(user);
            axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=70c3368bcec74804aaa27e1e7ee7d8c6").then((post) =>{
    console.log(user);
    console.log(post.data.articles);
    res.render("index", { articles:post.data.articles, user});
    }).catch(err => console.log(err));
        });
    }else{
        res.render("auth/signup");
    }
});

    
module.exports = router;
