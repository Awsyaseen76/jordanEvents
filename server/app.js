module.exports = function(app) {

	var users = [{
		'userId': '111',
		'email': 'user1@email.com',
		'password': '1',
		'name': 'User 1',
		'registeredEventsList': []
	}, {
		'userId': '222',
		'email': 'user2@email.com',
		'password': '2',
		'name': 'User 2',
		'registeredEventsList': []
	}, {
		'userId': '333',
		'email': 'user3@email.com',
		'password': '3',
		'name': 'User 3',
		'registeredEventsList': []
	}, ];


	// http handlers
	app.get('/api/checkUserEmail/:userEmail', findUserByEmail);
	app.post('/api/registerUser/', addNewUser);
	app.get('/api/loginUser', findUserByUsernameAndPassword);
	app.get('/api/userProfile/:userId', findUserbyId);
	app.get('/api/getAllUsers', getAllUsers);
	app.post('/api/addEventToUser/:userId', addEventToUserEventsList);
	app.delete('/api/removeEventFromUser', removeRegisteredEvent);

	function getAllUsers(req, res){
		res.send(users);
	}

	function findUserByEmail(req, res){
		var userEmail = req.params.userEmail;
		for(var u in users){
			if(userEmail === users[u].email){
				res.send('Email already exists');
				return;
			}
		}
		res.send('0');

	}


	function addNewUser(req, res){

		var newUser = req.body;
		newUser.userId = Date.now()+'';
		newUser.registeredEventsList = [];
		// var newUser = {};
		// newUser.userId = Date.now()+'';
		// newUser.email = req.query.userEmail;
		// newUser.password = req.query.password;
		// newUser.name = req.query.name;
		// newUser.registeredEventsList = [];

		users.push(newUser);
		res.send(newUser);
		console.log('new User added');
	}

	function findUserByUsernameAndPassword(req, res){
		
		var userName = req.query.username;
		var password = req.query.password;
		for(var u in users){
			if (userName === users[u].email && password === users[u].password){
				res.send(users[u]);
				return;
			}
		}
		res.send('0');
	}

	function findUserbyId(req, res){
		var userId = req.params.userId;
		for(var u in users){
			if (userId === users[u].userId){
				res.send(users[u]);
				return;
			}
		}
		res.send('0');
	}

	function addEventToUserEventsList(req, res){
		var userId = req.params.userId;
		var event = req.body;
		for(var u in users){
			if (userId === users[u].userId){
				users[u].registeredEventsList.push(event);
				res.send(users[u]);
				return;
			}
		}
		res.sendStatus(404);
	}

	function removeRegisteredEvent(req, res){
		var userId = req.query.userId;
		var eventId = req.query.eventId;
		console.log('userId is: ', userId);
		console.log('event id is: ', eventId);
		for(var u in users){
			if(userId === users[u].userId){
				for(var e in users[u].registeredEventsList){
					if(eventId === users[u].registeredEventsList[e].eventId){
						console.log('catched: ', users[u].registeredEventsList[e]);
						users[u].registeredEventsList.splice(e, 1);
						res.sendStatus(200);
						return;
					}
				}
			}
		}
		res.sendStatus(404);
	}

};