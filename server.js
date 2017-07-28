var express = require("express");
var path = require("path");
var app = express();
var mongoose = require("mongoose")
var bodyParser = require("body-parser");
var routes = require("./server/routes");
var bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var session = require("express-session");
var auth = require("./server/auth/passport-local");
var multer =require("multer")

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

app.listen(8080)
mongoose.connect("mongodb://localhost/ass");