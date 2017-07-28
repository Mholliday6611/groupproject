var mongoose = require("mongoose");


var user = new mongoose.Schema({
    username: String, 
    password: String,
    bio: String, 
    highScore: Number,
    posts: [],
    
});

module.exports = mongoose.model("user", user);