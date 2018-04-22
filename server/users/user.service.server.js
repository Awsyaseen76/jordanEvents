var usersDB = require('./users.model.server.js');

module.exports = function(app) {


	// var users = [{
	// 	'userId': '111',
	// 	'email': 'user1@email.com',
	// 	'password': '1',
	// 	'name': 'User 1',
	// 	'registeredEventsList': []
	// }, {
	// 	'userId': '222',
	// 	'email': 'user2@email.com',
	// 	'password': '2',
	// 	'name': 'User 2',
	// 	'registeredEventsList': []
	// }, {
	// 	'userId': '333',
	// 	'email': 'user3@email.com',
	// 	'password': '3',
	// 	'name': 'User 3',
	// 	'registeredEventsList': []
	// }, ];

	// http handlers
	app.get('/api/checkUserEmail/:userEmail', findUserByEmail);
	app.post('/api/registerUser/', addNewUser);
	app.get('/api/loginUser', loginUser);
	app.get('/api/userProfile/:userId', findUserbyId);
	app.get('/api/getAllUsers', getAllUsers);
	app.post('/api/addEventToUser/:userId', addEventToUserEventsList);
	app.delete('/api/removeEventFromUser', removeRegisteredEvent);

	function getAllUsers(req, res){
		usersDB
			.getAllUsers()
			.then(function(users){
				res.send(users);
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

	function loginUser(req, res){
		var username = req.query.username;
		var password = req.query.password;
		usersDB
			.loginUser(username, password)
			.then(function(user){
				if(user){
					res.send(user);
					return;
				}
				res.send('0');
			});
		// for(var u in users){
		// 	if (userName === users[u].email && password === users[u].password){
		// 		res.send(users[u]);
		// 		return;
		// 	}
		// }
		// res.send('0');
	}

	function findUserbyId(req, res){
		var userId = req.params.userId;
		usersDB
			.findUserbyId(userId)
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
		// for(var u in users){
		// 	if(userId === users[u].userId){
		// 		for(var e in users[u].registeredEventsList){
		// 			if(eventId === users[u].registeredEventsList[e].eventId){
		// 				users[u].registeredEventsList.splice(e, 1);
		// 				res.sendStatus(200);
		// 				return;
		// 			}
		// 		}
		// 	}
		// }
		// res.sendStatus(404);
	}

};