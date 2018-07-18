const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newSchema = Schema({
    title: {type: String,unique: true},
    description: String,
    img: {type: String, default: "http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png"},
    date:  String,
    link: String,
    //threads: [commentSchema.Types.ObjectId]

} , {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

const Post = mongoose.model('Post', newSchema);
module.exports = Post;

