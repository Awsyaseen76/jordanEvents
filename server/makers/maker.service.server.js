module.exports = function(app) {



var makersDB = require('./makers.model.server.js');
var passport = require('passport');
console.log('maker step 1');
var LocalStrategy = require('passport-local').Strategy;
console.log('maker step 2');
passport.use('localMaker', new LocalStrategy(makerStrategy));
console.log('maker step 3');



// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);



	app.get('/api/maker/getAllMakers', getAllMakers);
	app.get('/api/maker/', findMaker);
	app.get('/api/maker/:makerEmail', findMaker);
	app.post('/api/maker/login', passport.authenticate('localMaker'), loginMaker);
	app.post('/api/maker/', addNewMaker);
	app.get('/api/checkMakerLogin', checkMakerLogin);
	app.get('/api/logoutMaker', logoutMaker);

	function makerStrategy(username, password, done) {
		console.log('maker step 4');
		makersDB
			.loginMaker(username, password)
			.then(
				function(maker){
					console.log('maker step 5');
					if(!maker){
						return done(null, false);
					} else {
						return done(null, maker);
					}
				},
				function(err){
					if(err){
						return done(err);
					}
				}
			);
	}


	function logoutMaker(req, res){
		req.logout();
		res.sendStatus(200);
	}


	function loginMaker(req, res){
		console.log('maker step 7');
		var maker = req.user;
		res.json(maker);
	}

	function findMaker(req, res){
		if (req.params.makerEmail) {
			var makerEmail = req.params.makerEmail;
			makersDB
				.findMakerByEmail(makerEmail)
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
		
		if(req.query.makerId){
			var makerId = req.query.makerId;
			makersDB
				.findMakerById(makerId)
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


	function getAllMakers(req, res) {
		makersDB
			.getAllMakers()
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


	function addNewMaker(req, res){
		var newMaker = req.body;
		makersDB
			.addNewMaker(newMaker)
			.then(function (addedMaker){
				res.send(addedMaker);
			});
	}


	function checkMakerLogin(req, res){
		console.log('maker step 8');
		res.send(req.isAuthenticated()? req.user : '0');
	}


	// function serializeUser(user, done) {
	// 	console.log('maker step 6    serializeUser');
 //    	done(null, user);
	// }

	// function deserializeUser(user, done) {
	//     console.log('maker deserializeUser');
	//     makersDB
	//         .findMakerById(user._id)
	//         .then(
	//             function(maker){
	//                 done(null, maker);
	//             },
	//             function(err){
	//                 done(err, null);
	//             }
	//         );
	// }



};