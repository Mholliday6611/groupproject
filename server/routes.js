var User = require("./models/usermodel");
var Post = require("./models/forum_post_model")
var auth = require("./auth/local-signup")
var path = require("path");

function today(){
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (day < 10){
            day ='0' + day;
        }

        if (month < 10) {
            month = '0' + month;
        }

        return {
            month: month,
            year: year,
            day: day
        }
    };

module.exports = function(app, passport){
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../client/index.html"));
    });

    app.get("/leader/score", function(req, res){
        User.find({}, function(err,score){
            res.send(score)
        })
    });

    app.put("/highscore/:id", function(req,res){
        User.findByIdAndUpdate(req.query.id, {$set: {"highScore":req.body.highScore}}, function(err,doc){
            console.log(doc);
            if(err){
                res.send("update fail");
            }else {
                res.send("update success");
            }
        })

    });

    app.get("/user/profile", function(req,res){
        User.findOne({"username": req.query.user}, function(err, user){
            if(err){
                console.log(err);
            }else{
                res.send(user)
            }
        })

    });

    app.post("/user-signup", function(req,res){
        auth({
            name: req.body.username,
            pass: req.body.password,
            bio: req.body.bio
        }, function(data){
            if(data.success){
                res.json({
                    "success": "All good"
                });
            }else {
                res.json({
                    "success": "Not Good"
                });
            }
        });

    });

    app.post("/user-login", passport.authenticate("local-login"), function(req,res){
        res.json(req.user);
    });

    app.post("/logout", function(req, res) {
      req.logOut();
      res.send(200);
    })

    app.get("/loggedin", function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post("/forum/createPost", function(req, res){
        new Post({
            title: req.body.title,
            post: req.body.post,
            date: {
                month: today().month,
                day: today().day,
                year: today().year
            },
            user: req.user.username
        }).save(function(err){
            if(err){
                console.log(err);
            } else {
                res.send("All Good");
            }
        })
    });

    app.get("/forum/directory", function(req, res){
        Post.find({}, function(err,posts){
            res.send(posts)
        })
    });

    app.get("/forum/post/:id", function(req,res){
        Post.findOne({"_id": req.query.id}, function(err, post){
            if(err){
                console.log(err);
            }else{
                res.send(post)
            }
        })

    });

    app.put("/forum/comment/:id", function(req,res){
        console.log(req.query.id);
        Post.findByIdAndUpdate(req.query.id, {$addToSet:{"comments" :{"comment":req.body.comment, "user":req.user.username}}},{new:true}, function(err,doc){
            console.log(doc);
            if(err){
                console.log(doc)
                res.send("update fail");
            }else {
                console.log(doc)
                res.send("update success");
            }
        })

    });

    app.put("/forum/update/:id", function(req, res){
        Post.findByIdAndUpdate(req.query.id, {$set: {"tile":req.body.tile, "post": req.body.post}}, function(err,doc){
            console.log(doc);
            if(err){
                res.send("update fail");
            }else {
                res.send("update success");
            }
        })

    });


    app.delete("/forum/delete/:id", function(req, res){
        Post.find({"_id": req.query.id}).remove(function(err, id){
            if(err){
                console.log(err);
            }else {
                res.send()
            }
        })
    });
}

    