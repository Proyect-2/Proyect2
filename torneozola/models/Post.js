const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = Schema({
    title: String,
    description: String,
    img: String,
    date:  String,
    link: String,
    //threads: [commentSchema.Types.ObjectId]

} , {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

const Post = mongoose.model('Post', newSchema);
module.exports = Post;