const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    description: String,
    savedNews: String,
    likes: Number
});

const User = mongoose.model('User', commentSchema);
module.exports = User;

