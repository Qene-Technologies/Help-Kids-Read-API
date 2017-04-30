var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new LocalStrategy({
		usernameField: 'phone'
	},
	function(username, password, done){
		User.findOne({phone: username }, function(err, user){
			if(err){return done(err);}
			if(!user){
				return done(null, false, {
					message: 'Incorect username.'
				});
			}
			if(!user.validPassword(password)){
				return done(null, false, {
					message: 'Incorect password.'
				});
			}
			return done(null, user);
		});
	}
	));