
var usersDB = require('./users.model.server.js');

module.exports = function(app) {


var passport = require('passport');
console.log('user step 1');

// for image upload
	var multer = require('multer');
	var path = require('path');
	var fs = require('fs');
	
	// Set Storage Engine
	var storage = multer.diskStorage({
		destination: './public/img/profileImages',
		filename: function(req, file, cb){
			// cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
			cb(null, req.user._id + path.extname(file.originalname));
		}
	});

	// Init Upload
	var upload = multer({
		storage: storage,
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

var bcrypt   = require('bcrypt-nodejs');

var LocalStrategy = require('passport-local').Strategy;
console.log('user step 2');
passport.use('localUser', new LocalStrategy(userStrategy));
console.log('user step 3');
// put the user object in the cookies and then compare the logged with the cookies via deserializeUser

// var imageUploader = upload.single('profilePicture');


	// http handlers
	app.get('/api/checkUserEmail/:userEmail', findUserByEmail);
	app.post('/api/registerUser/', addNewUser);
	app.get('/api/userProfile/:userId', findUserById);
	app.get('/api/getAllUsers', getAllUsers);
	app.post('/api/user/login', passport.authenticate('localUser'), loginUser);
	app.post('/api/addEventToUser/:userId', addEventToUserEventsList);
	app.delete('/api/removeEventFromUser', removeRegisteredEvent);
	app.get('/api/checkUserLogin', checkUserLogin);
	app.get('/api/logoutUser', logoutUser);
	app.post('/api/userProfile/upload', upload.single('profilePicture'), uploadImage);


// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

	function uploadImage(req, res){
			var profileImage = req.file;
			
			// if there is no file uploaded throw an error
			// if(profileImage == undefined){
			// 	res.send(err)
			// }

			// add the file data to user database
			usersDB
				.addProfileImage(req.user._id, profileImage)
				.then(function(user){
					// console.log(user);
				});
			res.redirect('/#!/userProfile');
	}







	function logoutUser(req, res){
		console.log('im going to logout the user');
		req.logOut();
    	res.sendStatus(200);
	}

	function checkUserLogin(req, res){
		// this one show the current user in the session // it is like req.isAuthenticated() function 
		//console.log(req.session.passport.user);
		// console.log(req.isAuthenticated());
		res.send(req.isAuthenticated()? req.user : '0');
	}

	function userStrategy(username, password, done) {
		console.log('user step 4');
		usersDB
			.findUserByEmail(username)
			.then(
				function(user){
					console.log('user step 5');
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


	function loginUser(req, res){
		console.log('user step 7');
		var user = req.user;
		res.json(user);

		// var username = req.body.username;
		// var password = req.body.password;
		// // res.json(user);
		// usersDB
		// 	.loginUser(username, password)
		// 	.then(
		// 		// if success
		// 		function(user){				
		// 		if(user){
		// 			res.send(user);
		// 			return;
		// 		}
		// 		res.send('0');
		// 	}, 
		// 	// if error
		// 	function(err){
		// 		res.sendStatus(404).send(err);
		// 		return;
		// 	});
		
	}


	function getAllUsers(req, res){
		usersDB
			.getAllUsers()
			.then(function(response){
				res.send(response);
			});
	}

	function findUserByEmail(req, res){
		var userEmail = req.params.userEmail;
		usersDB
			.findUserByEmail(userEmail)
			.then(function(user){
				if(user){
					res.send('Email already exists');
					return;
				}
				res.send('0');
			});
		// for(var u in users){
		// 	if(userEmail === users[u].email){
		// 		res.send('Email already exists');
		// 		return;
		// 	}
		// }
		// res.send('0');

	}


	function addNewUser(req, res){
		var newUser = req.body;
		newUser.password = bcrypt.hashSync(newUser.password);
		usersDB
			.addNewUser(newUser)
			.then(function(addedUser){
				if(addedUser){
					res.send(addedUser);
					return;
				}
				res.send('error');
			});
		// newUser.userId = Date.now()+'';
		// newUser.registeredEventsList = [];
		// users.push(newUser);
		// res.send(newUser);
	}


	function findUserById(req, res){
		var userId = req.params.userId;
		usersDB
			.findUserById(userId)
			.then(function(user){
				if(user){
					res.send(user);
					return;
				}
				res.send('0');
			});
		// for(var u in users){
		// 	if (userId === users[u].userId){
		// 		res.send(users[u]);
		// 		return;
		// 	}
		// }
		// res.send('0');
	}

	function addEventToUserEventsList(req, res){

		// note: add a logic to check if the user already registered so don't register again.
		var userId = req.params.userId;
		var event = req.body;
		usersDB
			.addEventToUserEventsList(userId, event._id)
			.then(function(result){
				res.send(result);
			});
		// for(var u in users){
		// 	if (userId === users[u].userId){
		// 		users[u].registeredEventsList.push(event);
		// 		res.send(users[u]);
		// 		return;
		// 	}
		// }
		// res.sendStatus(404);
	}

	function removeRegisteredEvent(req, res){
		var userId = req.query.userId;
		var eventId = req.query.eventId;
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
	// 	console.log('user deserializeUser');
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

