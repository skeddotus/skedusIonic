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
			callbackURL: "http://127.0.0.1:9001/api/auth/linkedin/callback",
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

