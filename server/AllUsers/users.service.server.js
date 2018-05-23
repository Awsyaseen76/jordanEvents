module.exports = function(app) {



var usersDB = require('./users.model.server.js');
var passport = require('passport');
var bcrypt   = require('bcrypt-nodejs');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_ACCOUNT,
		pass: process.env.GMAILPASS
	}
});


console.log('step 1');
var LocalStrategy = require('passport-local').Strategy;
console.log('step 2');
passport.use('localUser', new LocalStrategy(userStrategy));
// add another one for the signup
// passport.use('localUser_signup', new LocalStrategy(userStrategy_signup));

console.log('step 3');



// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);



	app.get('/api/user/getAllUsers', getAllUsers);
	app.get('/api/user/', findUser);
	app.get('/api/user/:userEmail', findUser);
	app.post('/api/user/login', passport.authenticate('localUser'), loginUser);
	
	app.post('/api/user/', addNewUser);
	app.get('/api/checkUserLogin', checkUserLogin);
	app.get('/api/isMaker', isMaker);
	app.get('/api/admin/isAdmin', checkAdmin, isAdmin);
	app.post('/api/logout', logout);
	app.post('/api/addEventToUser', addEventToUserEventsList);
	app.delete('/api/removeEventFromUser/:eventId', removeRegisteredEvent);

	// login with google
	app.get('/jordanEvents/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	app.get('/jordanEvents/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#!/profile',
        failureRedirect: '/#!/loginUser'
    }));


	function userStrategy(username, password, done) {
		console.log('step 4');
		usersDB
			.findUserByEmail(username)
			.then(
				function(user){
					console.log('step 5');
					if(!user){
						return done(null, false);
					} else if(user && bcrypt.compareSync(password, user.password)){
						return done(null, user);
					}
				},
				function(err){
					if(err){
						return done(err);
					}
				}
			);
	}






	var googleConfig = {
	    clientID     : process.env.GOOGLE_CLIENT_ID,
	    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
	    callbackURL  : process.env.GOOGLE_CALLBACK_URL
	};


    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    function googleStrategy(token, refreshToken, profile, done) {
    usersDB
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return usersDB.addNewUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}









// ********* signup strategy *******
// function userStrategy_signup(username, password, done) {
// 		console.log('user signup step 4');
// 		usersDB
// 			.addNewUser(username, password)
// 			.then(
// 				function(user){
// 					console.log('user step 5');
// 					if(!user){
// 						return done(null, false);
// 					} else {
// 						return done(null, user);
// 					}
// 				},
// 				function(err){
// 					if(err){
// 						return done(err);
// 					}
// 				}
// 			);
// 	}

// **********************************


	function logout(req, res){
		req.session.destroy();
		req.logout();
		res.sendStatus(200);
	}


	function loginUser(req, res){
		console.log('step 7');
		var user = req.user;
		res.json(user);
	}

	function findUser(req, res){
		if (req.params.userEmail) {
			var userEmail = req.params.userEmail;
			usersDB
				.findUserByEmail(userEmail)
				.then(
					// if seccess
					function(result){
						if(result){
							res.send(result);
							return;
						} else {
							res.send('error');
							return;
						}
					},
					function(err){
						res.sendStatus(404).send(err);
						return;
					}
				);

		}
		
		if(req.query.userId){
			var userId = req.query.userId;
			usersDB
				.findUserById(userId)
				.then(function(result){
					if(result){
						res.send(result);
						return;
					} else {
						res.send('error');
						return;
					}
				});
		}
	}


	function getAllUsers(req, res) {
		usersDB
			.getAllUsers()
			.then(function(result){
				if(result){
					res.send(result);
					return;
				} else {
					res.send('error');
					return;
				}
			});
	}


	function addNewUser(req, res){
		var newUser = req.body;
		newUser.password = bcrypt.hashSync(newUser.password);
		usersDB
			.addNewUser(newUser)
			.then(function (addedUser){
				req.login(addedUser, function(err){
					if(err){
						return err;
					}else{
						var mailOptions = {
						from: 'jordanevents2018@gmail.com',
						to: addedUser.email,
						subject: 'Registration complete',
						html: '<h3>Your registration completed successfully!</h3><p>You can now enjoy with our services...</p><h5>Jordan Events Team</h5>'
						};

						transporter.sendMail(mailOptions, function(error, info){
							if (error) {
								console.log(error);
							} else {
								console.log('Email sent: ' + info.response);
							}
						});

						res.json(addedUser);
					}
				});
			});
	}


	function checkUserLogin(req, res){
		console.log('step 8');
		res.send(req.isAuthenticated()? req.user : null);
	}

	function isMaker(req, res){
		res.send(req.isAuthenticated() && req.user.userType === 'maker' ? req.user : null);
	}

	function isAdmin(req, res){
		var admin = req.user;
		res.send(admin);
	}

	function checkAdmin(req, res, next){
		if(req.isAuthenticated() && req.user.userType === 'admin'){
			next();
		}
		else{
			return null;
		}
	}

	function addEventToUserEventsList(req, res){
		var userId = req.user._id;
		var event = req.body;
		usersDB
			.addEventToUserEventsList(userId, event._id)
			.then(function(result){
				res.send(result);
			});
	}

	function removeRegisteredEvent(req, res){
		var userId = req.user._id;
		var eventId = req.params.eventId;
		usersDB
			.removeRegisteredEvent(userId, eventId)
			.then(function(status){
				res.send(status);
			});
	}
	// function serializeUser(user, done) {
	// 	console.log('user step 6    serializeUser');
 //    	done(null, user);
	// }

	// function deserializeUser(user, done) {
	//     console.log('user deserializeUser');
	//     usersDB
	//         .findUserById(user._id)
	//         .then(
	//             function(user){
	//                 done(null, user);
	//             },
	//             function(err){
	//                 done(err, null);
	//             }
	//         );
	// }



};