var userServCtrl = require('../Controllers/userServCtrl.js');
var User = require('../Models/userSchema.js');
var mandrillService = require('../Services/mandrillService');
var crypto = require('crypto');
var async = require('async');


module.exports = function(app, passport) {

	//route middleware
	var requireAuth = function(req, res, next) {
		if (!req.isAuthenticated()) {
			return res.status(401).end();
		}
		console.log("requireAuth done");

		next();
	};

	//LINKEDIN ROUTES //////////////////////////////////////

	app.get('/api/auth/linkedin',
		passport.authenticate('linkedin'),
		function(req, res) {
			app.post('/api/users', req.user);
			console.log("posted new linkedin user : ", req.user);
	});

	app.get('/api/auth/linkedin/callback',
		passport.authenticate('linkedin', {failureRedirect: '/#/login' }),
		function(req,res) {
			res.redirect('/#/home');
	});


	//LOCAL-AUTH ROUTES ///////////////////////////////////

	//registration
	app.post('/api/users', userServCtrl.addUser);

	//login
	app.post('/api/auth/local', passport.authenticate('local'), requireAuth, function(req, res) {
		res.status(200).end();
	});

	//logout
	app.get('/api/auth/logout', function(req, res) {
		console.log("api/auth/logout");
		req.logout();
		req.session.destroy();
		return res.status(200).end();
	});

	//USER ROUTES/////////////////////////////////////////////

	//get users
	app.get('/api/users', requireAuth, function(req, res) {
		User.find().exec().then(function(res) {
			if (!res) {
				return res.status(404).end();
			} else {
				console.log(res);
				return res.json(res);
			}
			// return res.status(200).end();
		});
	});

	// app.get('/api/user/:id', function(req, res) {
	// 	User.findOne({ _id : req.params.id }).exec().then(function(res) {
	// 		console.log(res);
	// 		return res.json(res).end();
	// 	})
	// })

	//update user
	app.put('/api/users/:id', function(req, res) {
		User.update({ _id: req.params.id}, req.body).exec().then(function(res) {
			console.log(res);
			return res.status(200).end();
		});
	});


	//CHECK LOGGED IN USER //////////////////////////////////

	app.get('/api/users/currentUser', requireAuth, function(req, res) {
		// console.log("req.user", req.user);
		return res.json(req.user);
	});


	//ADDING LINKEDIN ////////////////////////////////////////

  // send to facebook to do the authentication
  app.get('/connect/linkedin', passport.authorize('linkedin', { scope : 'email' }));

  // handle the callback after linkedin has authorized the user
  app.get('/connect/linkedin/callback',
      passport.authorize('linkedin', {
          successRedirect : '/profile',
          failureRedirect : '/'
      }));

  //FORGOT PASSWORD//////////////////////////////////////////

  app.post('/api/auth/forgot/:email', function(req, res, next) {
	  async.waterfall([
	    function(done) {
	      crypto.randomBytes(20, function(err, buf) {
	        var token = buf.toString('hex');
	        done(err, token);
	      });
	    },
	    function(token, done) {
	      User.findOne({ email: req.params.email }, function(err, user) {
	        if (!user) {
	        	console.log("err found : ", err);
	          // req.flash('error', 'No account with that email address exists.');
	          res.redirect('/#/login');
	        }
	        user.resetPasswordToken = token;
	        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	        user.save().then(function() {
						mandrillService.forgotPass(req, token, user);
		        return res.status(201).end();
		      });
	      });
	    }
	  ], function(err) {
	    if (err) return next(err);
	    res.redirect('/forgot');
	  });
	});

	app.get('/reset/:token', function(req, res) {
	  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
	    if (!user) {
	      // req.flash('error', 'Password reset token is invalid or has expired.');
	      return res.redirect('/forgot');
	    }
	    // res.redirect('/#/reset')
	    res.render('/#/reset', {
	      user: req.user
	    });
	  });
	});

	app.post('/reset/:token/:password', function(req, res) {
	  async.waterfall([
	    function(done) {
	      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
	        if (!user) {
	          // req.flash('error', 'Password reset token is invalid or has expired.');
	          return res.redirect('back');
	        }

	        user.password = req.params.password;
	        user.resetPasswordToken = undefined;
	        user.resetPasswordExpires = undefined;
	        user.save().then(function() {
						mandrillService.PassChangeConfirm(user);
		        return res.status(201).end();
		      });
	      });
	    },
	  ], function(err) {
	    res.redirect('/home');
	  });
	});


};
