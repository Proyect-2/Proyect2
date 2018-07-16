const express = require('express');
const newsRoutes =  express.Router();
const User = require("../models/User");
const axios = require("axios");

/* newsRoutes.get("/", (req, res, next) => {
    axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=70c3368bcec74804aaa27e1e7ee7d8c6").then(post =>{
    console.log(post.data);
    res.render("index", { articles:post.data.articles});
    }).catch(err => console.log(err));
  });
*/
module.exports = newsRoutes;
