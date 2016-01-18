var LocalStrategy = require('passport-local').Strategy,
	LinkedinStrategy = require('passport-linkedin').Strategy,
	User = require('../../Server-assets/Models/userSchema.js'),
	Secret = require('../../Server-assets/Secrets/secrets.js');


module.exports = function(passport) {
		//configuration ------------
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	//LINKEDIN
	passport.use(new LinkedinStrategy({
			consumerKey: Secret.LINKED_IN_API_KEY,
			consumerSecret: Secret.LINKED_IN_API_SECRET,
			callbackURL: "http://127.0.0.1:9001/#/api/auth/linkedin/callback",
		},
		function(token, tokenSecret, profile, done) {
			process.nextTick(function () {
				return done(null, profile);
			});
		}
	));

	//LOCAL-AUTH
	passport.use(new LocalStrategy({
				usernameField: 'email',
				passwordField: 'password'
			},
	    function(email, password, done) {
	    	console.log("local strategy", password);
	      User.findOne({ email: email }, function (err, user) {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false); }
	        user.validPassword(password).then(function(result){
	        	if(!result){
	        		return done(null, false);
	        	}
	        	return done(null, user);
	        })
	      });
	    }
	  ));


}

	// passport.use(new LinkedinStrategy({
	// 		consumerKey: Secret.LINKED_IN_API_KEY,
	// 		consumerSecret: Secret.LINKED_IN_API_SECRET,
	// 		callbackURL: "http://127.0.0.1:9001/api/auth/linkedin/callback",
	// 		passReqToCallback: true,
	// 	},
	// 	function(req, token, tokenSecret, profile, done) {
	// 		process.nextTick(function () {

	// 			return done(null, profile);

	// 			if(!req.user) { //if not logged in, authenticate with linkedin or create a new user
				

	// 				User.findOne({ linkedinId : profile.id }, function(err, user) {
	// 					if (err) {
	// 						console.log("linkedin error : ", err);
	// 						return done(err);
	// 					}

	// 					if (user) {
	// 						console.log("authenticating with linkedin, found user : ", user)
	// 						return done(null, user);
	// 					}

	// 					else {
	// 						console.log("creating user with linkedin : ", profile);

	// 						var user = new User ({

	// 							"user.linkedinId ": profile.id,
	// 							"user.linkedinToken" : token,
	// 							"user.linkedinEmail" : profile.email,
	// 							"user.linkedinName" : profile.name,

	// 						})

	// 						user.save();
	// 						console.log("user created with linkedin : ",  user);
	// 					}
	// 				})

	// 			} 
	// 			else { //if logged in, link accounts

	// 				user = req.user;

	// 				user.linkedinId = profile.id,
	// 				user.linkedinToken = token,
	// 				user.linkedinEmail = profile.email,
	// 				user.linkedinName = profile.name,

	// 				user.save();

	// 				console.log("user linked to linkedin : ", user);

	// 			}

	// 		});
	// 	}
	// ));



