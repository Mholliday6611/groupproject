var mongoose = require("mongoose");

var forumPost = new mongoose.Schema({
    title: String, 
    post: String,
    date: {
        month: String,
        day: String,
        year: String
    },
    user: String,
    comments: [{
        comment: String,
        user: String
    }]
});

//Name: A Special Shooter

module.exports = mongoose.model("posts", forumPost);