	var bcrypt = require("bcrypt-nodejs"),
		User = require("../models/usermodel");

	module.exports = function(user, callback){
		new User({
			username: user.name,
			password: bcrypt.hashSync(user.pass),
			bio: user.bio,
			highScore: 1,
			admin: false,
			createdAt: new Date().toLocaleDateString()
		}).save(function(err){
			if(err){
				callback({
					"success": false,
					"reason": "Failed to save user"
				});
			} else {
				callback({
					"success": true,
					"reason": "Saved user"
				});
			}
		});
	}