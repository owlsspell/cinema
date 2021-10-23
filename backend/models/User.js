const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  age: Number,
  posts: [
    {title: String,
    content: String,}
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User