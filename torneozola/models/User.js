const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  description:{type: String, default:""},
  age:Date,
  gender:{type:String, enum:["Man","Woman",""], default:""},
  status:{type:String, default:""},
  news: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  profilePhoto:{type:String,default:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1024px-Imagen_no_disponible.svg.png"},
  lastLogIn:{type:String,default:""}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
