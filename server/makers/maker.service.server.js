
var makersDB = require('./makers.model.server.js');



module.exports = function(app) {

	app.get('/api/maker/getAllMakers', getAllMakers);
	app.get('/api/maker/', findMaker);
	app.get('/api/maker/login/', loginMaker);
	app.get('/api/maker/:makerEmail', findMaker);
	// app.get('/api/maker/:makerId', findMaker);
	app.post('/api/maker/', addNewMaker);


	function loginMaker(req, res){
		var email = req.query.email;
		var password = req.query.password;
		makersDB
			.loginMaker(email, password)
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

	function findMaker(req, res){
		if (req.params.makerEmail) {
			var makerEmail = req.params.makerEmail;
			makersDB
				.findMakerByEmail(makerEmail)
				.then(function(result){
					if(result){
						console.log(result);
						res.send(result);
						return;
					} else {
						res.send('error');
						return;
					}
				});

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

};