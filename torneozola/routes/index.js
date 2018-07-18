const express = require('express');
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const Post = require("../models/Post");
const moment=require("moment")
/* GET home page */
let a=0;

router.get('/', (req, res, next) => {
    a=0;
    if (req.session.passport != undefined) {
        const user = req.session.passport.user;
     const date = moment(Date.now()).format('YYYY-MM-DD')
        User.findOneAndUpdate({ _id: user },{"lastLogIn": date}).then(user => {
            axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=70c3368bcec74804aaa27e1e7ee7d8c6").then((post) =>{
                post.data.articles.forEach(post => {
                    if(Post.find({title:post.title})){}
                   else{
                    Post.create({
                        title: post.title,
                        description: post.description,
                        img: post.urlToImage,
                        date: post.publishedAt,
                        link: post.url
                    });
                }
                });
                Post.find({}).sort({updated_at:-1}).limit(10).then((articles)=>{
                    res.render("index", { articles, user:true });
                })
            }).catch(err => console.log(err));
        });
    } else {
        res.render("auth/signup");
    }
});

router.post('/news/:id', (req, res, next) => {
    const userId = req.session.passport.user;
    const articleId = req.params.id
 User.findByIdAndUpdate(userId,{$push:{news:articleId}}).then(()=>{
    res.redirect('/');
 })
})

router.get("/news",(req, res, next) => {
                Post.find({}).skip(a+10).limit(10).then((articles)=>{
                    a+=10;
                    console.log(a)
                    res.render("index", { articles, user:true});
                })
            })


// router.get("/articles/:id", (req,res) =>{
//  const articleId = req.params.id;
//  const userId = req.session.passport.user;
//  console.log("article")
//  User.findByIdAndUpdate(userId,{$push:{news:articleId}}).then(()=>{
//     res.redirect('/');
//  })
// });

router.get('/explore',(req, res, next) => {
    User.find({}).then(users =>{
        res.render('explore',{users});
     })
})


module.exports = router;
