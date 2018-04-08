module.exports = function(app) {
	var makers = [{
		'makerId': '111',
		'email': 'maker1@email.com',
		'password': '1',
		'name': 'Maker 1'
	}, {
		'makerId': '222',
		'email': 'maker2@email.com',
		'password': '2',
		'name': 'Maker 2'
	}, {
		'makerId': '333',
		'email': 'maker3@email.com',
		'password': '3',
		'name': 'Maker 3'
	}];

	app.get('/api/getAllMakers', getAllMakers);
	app.get('/api/maker/', findMaker);
	app.get('/api/maker/:makerEmail', findMaker);
	app.get('/api/maker/:makerId', findMaker);
	app.post('/api/maker/', addNewMaker);



	function findMaker(req, res){
		if(req.query.email && req.query.password){
			res.send(matchMaker(req.query.email, req.query.password));
			return;
		}
		if (req.params.makerEmail) {
			console.log('im here');
			res.send(findMakerByEmail(req.params.makerEmail));
			return;
		}
		if(req.query.makerId){
			res.send(findMakerById(req.query.makerId));
			return;
		}
	}


	// findmaker sub functions

	function matchMaker(email, password) {
		for (var m in makers) {
			if (email === makers[m].email && password === makers[m].password) {
				return (makers[m]);
			}
		}
		return('error');
	}

	function findMakerById(makerId){
		for (var m2 in makers) {
			if (makerId === makers[m2].makerId) {
				return(makers[m2]);
			}
		}
		return('error');
	}

	function findMakerByEmail(makerEmail){
		console.log(makerEmail);
		for(var m in makers){
			if(makerEmail === makers[m].email){
				return ('email already exist');
			} else{
				return ('ready to add');
			}
		}
		// return(makerEmail);
	}


	function getAllMakers(req, res) {
		res.send(makers);
	}


	function addNewMaker(req, res){
		var newMaker = req.body;
		newMaker.makerId = Date.now() + '';
		makers.push(newMaker);
		console.log(newMaker);
		res.send(newMaker);
	}

};