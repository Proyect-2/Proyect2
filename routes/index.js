const express = require('express');
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const Post = require("../models/Post");
const moment = require("moment");
/* GET home page */
let a=1;

router.get("/",(req, res, next) => {
    a=1;
    res.render("/:le");
})

router.post('/news/:id', (req, res, next) => {
    const userId = req.session.passport.user;
    const articleId = req.params.id
    User.findByIdAndUpdate(userId, { $push: { news: articleId } }).then(() => {
        res.redirect('/');
    })
})

// router.get("/news",(req, res, next) => {
//     Post.find({}).skip(a+10).limit(10).then((articles)=>{
//         a+=10;
//         console.log(a)
//         res.render("index", { articles, user:true});
//     })
// })

router.get("/articles/:id", (req,res) =>{
     const articleId = req.params.id;
     const userId = req.session.passport.user;
     console.log("article")
     User.findByIdAndUpdate(userId,{$push:{news:articleId}}).then(()=>{
            res.redirect('/');
         })
        });
        
        router.get('/explore',(req, res, next) => {
            const userId = req.session.passport.user;
            if(!userId){
                res.render("auth/private")
            }
            else{
            User.find({}).then(users =>{
                res.render('explore',{users});
            })
        }
        })
        
        router.get('/:le', (req, res, next) => {
            const le = req.params.le;
            console.log('entra')
            if (req.session.passport != undefined) {
                const user = req.session.passport.user;
             const date = moment(Date.now()).format('YYYY-MM-DD')
                User.findOneAndUpdate({ _id: user },{"lastLogIn": date}).then(user => {
                    axios.get(`https://newsapi.org/v2/top-headlines?country=${le}&apiKey=70c3368bcec74804aaa27e1e7ee7d8c6`).then((post) =>{
                        post.data.articles.forEach(post => {
                        //     if(Post.find({title:post.title})){}
                        //    else{
                            Post.create({
                                title: post.title,
                                description: post.description,
                                img: post.urlToImage,
                                date: post.publishedAt,
                                link: post.url
                            });
                       // }
                        });
                        Post.find({}).skip(a).limit(10).then((articles)=>{
                            a+=10;
                            console.log(a)
                            console.log(articles.length)
                            res.render("index", { articles, user:true});
                        })
                    }).catch(err => console.log(err));
                });
                Post.find({}).sort({ updated_at: -1 }).limit(10).then((articles) => {
                    res.render("index", { articles, user: true });
                })
            }).catch(err => console.log(err));
        });
    } else {
        res.render("auth/signup");
    }
});

router.get('/:category', (req, res, next) => {
    a = 0;
    const category = req.params.category;
    console.log('entra');
    if (req.session.passport != undefined) {
        const user = req.session.passport.user;
        const date = moment(Date.now()).format('YYYY-MM-DD')
        User.findOneAndUpdate({ _id: user }, { "lastLogIn": date }).then(user => {
            axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=70c3368bcec74804aaa27e1e7ee7d8c6`).then((post) => {
                console.log(post.data.articles)
                post.data.articles.forEach(post => {
                    //     if(Post.find({title:post.title})){}
                    //    else{
                    Post.create({
                        title: post.title,
                        description: post.description,
                        img: post.urlToImage,
                        date: post.publishedAt,
                        link: post.url
                    });
                    // }
                });
                Post.find({}).sort({ updated_at: -1 }).limit(10).then(function (articles) {
                    res.render("index", { articles:articles, user: true });
                });
            }).catch(function(err) {console.log(err);});
        });
    } else {
        res.render("auth/signup");
    }
});


 
 
module.exports = router;

