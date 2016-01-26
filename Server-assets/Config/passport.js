var LocalStrategy = require('passport-local').Strategy,
	LinkedinStrategy = require('passport-linkedin').Strategy,
	User = require('../../Server-assets/Models/userSchema.js'),
	Secret = require('../../Server-assets/Secrets/secrets.js');
var Org = require('../Models/orgSchema');


module.exports = function(passport, app) {
		//configuration ------------
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});



	//LOCAL-AUTH
	passport.use(new LocalStrategy({
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
	    function(req, email, password, done) {
	    	console.log("local strategy", password);
	      User.findOne({ email: email }, function (err, user) {
	        if (err) {
	        	// req.flash('error', 'something went wrong');
	        	return done(err);
	        }
	        if (!user) {
	        	// req.flash('error', 'email does not exist, please register email')
	        	return done(null, false);
	        }
	        // user.validPassword(password).then(function(result){
	        // 	console.log("paoidjf");
	        // 	if(!result){
	    				// console.log(req.flash);
	        // 		req.flash('error', 'wrong password');
	        // 		return done(null, false);
	        // 	}
	        // 	return done(null, user);

	        if (user.status === 'archived') {
	        	user.status = 'active';
	        }


	        var result = user.validPassword(password);

	        	if(!result){
	        		return done(null, false);
	        	}
	        	return done(null, user);




	        // })
	      });
	    }
	  ));



	//LINKEDIN
	passport.use(new LinkedinStrategy({
			consumerKey: Secret.LINKED_IN_API_KEY,
			consumerSecret: Secret.LINKED_IN_API_SECRET,
			callbackURL: "http://127.0.0.1:9001/api/auth/linkedin/callback",
			scope: ['r_basicprofile', 'r_emailaddress'],
			profileFields: ['id', 'first-name', 'last-name', 'email-address'],
			passReqToCallback: true,
		},
		function(req, token, tokenSecret, profile, done) {
			process.nextTick(function () {

				if(!req.user) { //if not logged in, authenticate with linkedin or create a new user with linkedin information

					User.findOne({ linkedinId : profile.id }, function(err, user) {

						if (err) {
							console.log("linkedin error : ", err);
							return done(err);
						}

						if (user) {

							if (user.status === 'archived') {
			        	user.status = 'active';
			        }
							
							console.log("authenticating with linkedin, found user : ", user)
							return done(null, user);
						}

						else {
							console.log("creating user with linkedin : ", profile);

								var user = new User ({

									linkedinId : profile.id,
									linkedinToken : token,
									linkedinEmail : profile._json.emailAddress,
									linkedinName: profile.displayName,
									firstName : profile.name.givenName,
									lastName : profile.name.familyName,
									email : profile._json.emailAddress,

								})

								user.save();

								console.log("user created with linkedin : ",  user);

								return done(null, user);

						}

					})

				}
				else { //if logged in, link accounts

					user = req.user;

					user.linkedinId = profile.id,
					user.linkedinToken = token,
					user.linkedinEmail = profile._json.emailAddress;
					user.linkedinName = profile.displayName,

					console.log("user linked to linkedin : ", user);

					return done(null, user);

				}

			});
		}
	));

} //closing module.exports
