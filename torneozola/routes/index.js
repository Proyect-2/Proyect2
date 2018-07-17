const express = require('express');
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const Post = require("../models/Post");
const moment=require("moment")
/* GET home page */
router.get('/', (req, res, next) => {
    if (req.session.passport != undefined) {
        const user = req.session.passport.user;
     const date = moment(Date.now()).format('YYYY-MM-DD')
        User.findOneAndUpdate({ _id: user },{"lastLogIn": date}).then(user => {
        console.log(user);
            axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=70c3368bcec74804aaa27e1e7ee7d8c6").then((post) =>{
    // console.log(user);
    // console.log(post.data.articles);

                //Post.collection.drop();
                post.data.articles.forEach(post => {
                    Post.create({
                        title: post.title,
                        description: post.description,
                        img: post.urlToImage,
                        date: post.publishedAt,
                        link: post.url
                    });
                });
                Post.find({}, function (err, articles) {
                    if (err){
                        console.log(err)
                    }
                    // console.log(articles);
                    res.render("index", { articles, user });
                });
            }).catch(err => console.log(err));
        });
    } else {
        res.render("auth/signup");
    }
});

router.get("/articles/:id", (req,res) =>{
 const id = req.params.id;
 const userId = req.session.passport.user;

 User.findByIdAndUpdate(userId,{$push:{news:id}},(err,doc)=>{
     if(err)console.log(err);
     res.redirect('/');
 });
});
router.get('/explore',(req, res, next) => {
    User.find({}).then(users =>{
        res.render('explore',{users});
     })
})


module.exports = router;
