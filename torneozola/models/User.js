const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  description:{type: String, default:""},
  age:Number,
  gender:{type:String, enum:["Mujer","Hombre"], default:""},
  status:{type:String, default:""}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
