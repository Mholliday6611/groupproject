var express = require("express");
var path = require("path");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var routes = require("./server/routes");
var bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var session = require("express-session");
var auth = require("./server/auth/passport-local");
var multer =require("multer");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.use("/client", express.static(path.join(__dirname, "client")));
app.use("/templates", express.static(path.join(__dirname, "client/templates")));

app.use(session({
			secret : 'itsASecret',
			resave : true,
			saveUninitialized: true,
	}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());
	app.use(passport.session());

auth(passport)
routes(app, passport);

app.listen(process.env.PORT || 8080);
mongoose.connect("mongodb://localhost/assdb");