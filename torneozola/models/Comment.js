const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    description: String,
    savedNews: String,
    likes: Number,
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

const User = mongoose.model('User', commentSchema);
module.exports = User;