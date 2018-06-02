module.exports = function(app) {


var usersDB = require('./users.model.server.js');
var passport = require('passport');
var bcrypt   = require('bcrypt-nodejs');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var nodemailer = require('nodemailer');
var path = require('path');


var aws = require('aws-sdk');
var multerS3 = require('multer-s3');




aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: 'us-east-1'
});

var s3 = new aws.S3();





// for image upload
	var multer = require('multer');
	var fs = require('fs');
	
	// Set Local Storage Engine
	// var storage = multer.diskStorage({
	// 	destination: (__dirname + '/../../public/img/profileImages'),
	// 	filename: function(req, file, cb){
	// 		cb(null, req.user._id + path.extname(file.originalname));
	// 	}
	// });






	// Init Upload
	var upload = multer({
		// storage: storage,
		storage: multerS3({
        s3: s3,
        bucket: 'jordanevents',
        key: function (req, file, cb) {
            // console.log(file);
            // cb(null, file.originalname); //use Date.now() for unique file keys
            
            // -----------------------------
            // remove old image before upload new one
            var params = {
  					Bucket: "jordanevents", 
  					Key: req.user.profileImage.key
 				};
			s3.deleteObject(params, function(err, data) {
		   		if (err) console.log(err, err.stack); // an error occurred
		   		else     console.log(data);           // successful response
		   
 			});
            // -----------------------------




            var filelocation = 'profilepictures/'+req.user._id +'.'+ file.originalname.split('.')[1]; 
            cb(null, filelocation); //use Date.now() for unique file keys
        	}
    	}),
		limits: {fileSize: 1000000},
		fileFilter: function(req, file, cb){
			checkFileType(file, cb);
		}
	});//.single('profilePicture');

function checkFileType(file, cb){
	// Allowed extension
	var filetypes = /jpeg|jpg|png|gif/;
	var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	var mimetype = filetypes.test(file.mimetype);
	if(extname && mimetype){
		return cb(null, true);
	} else {
		return cb('Only (jpeg jpg png gif) images allowed');
	}
}



// for sending email upon registration
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.GMAIL_ACCOUNT,
		pass: process.env.GMAIL_PASS
	},
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

	// upload profile picture
	app.post('/api/userProfile/uploadProfilePic', upload.single('profilePicture'), uploadImage);

	function uploadImage(req, res){
			var profileImage = req.file;
			// console.log(profileImage);

			// if there is no file uploaded throw an error
			if(profileImage == undefined){
				res.send('No file selected');
				return;
			}else if (profileImage.size > 1000000){
				res.send('Image size is greater than 1MB');
				return;
			}

			// add the file data to user database
			usersDB
				.addProfileImage(req.user._id, profileImage)
				.then(function(user){
					// console.log(user);
				});
			res.redirect('/#!/userProfile');
	}





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
							html: 
								'<div align="center" style="background-color: beige">'+
										'<br><br>'+
										'<img src="cid:jordanEventsLogo001" style="width: 200px; height: 200px;"/>'+
										'<br>'+
										'<h1 style="color: indianred; font-size: 6em;">Welcome '+ addedUser.name.firstName + '!'+'</h1>'+
										'<h3 style="font-size: 3em;" >Your registration has been completed...</h3>'+
										'<br>'+
										'<p style="font-size: 2em;">You can now enjouy our services by logging in to <a href="http://jordanevents.herokuapp.com">our site</a> and register for deferents activities</p>'+
										'<br>'+
										'<h3 style="font-size: 3em;">Jordan Events Team</h3>'+
										'<br><br><br><br><br>'+
								'</div>',
								
								attachments: [{
						        	filename: 'jordanEvents.jpg',
						        	path: __dirname+'/jordanEvents.jpg',
						        	cid: 'jordanEventsLogo001' 
						    	}]
							
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