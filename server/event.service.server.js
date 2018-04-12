module.exports = function(app) {

		var events = [{
			'eventId': '1',
			'name': 'football',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '2',
			'name': 'football jordan',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '3',
			'name': 'football junior',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '4',
			'name': 'tenis',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '5',
			'name': 'tenis for adults',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '6',
			'name': 'tenis for girls',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '7',
			'name': 'badminton',
			'category': 'sport',
			'subcategory': 'badminton',
			'makerId': '333',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '8',
			'name': 'badminton for girls',
			'category': 'sport',
			'subcategory': 'badminton',
			'makerId': '333',
			'details': 'deteils of the events written by the event maker'
		}];

	

	// http handlers
	app.get('/api/allEvents', getAllEvents);
	// app.get('/api/event/:eventId', findEvent);
	app.get('/api/event/', findEvent);
	app.post('/api/event/', addNewEvent);
	app.put('/api/event/', updateEvent);
	app.delete('/api/event/', removeEvent);



	function findEvent(req, res){
		if(req.query.eventId){
			res.send(findEventByEventId(req.query.eventId));
			return;
		}
		if(req.query.makerId){
			res.send(findEventsByMakerId(req.query.makerId));
			return;
		}
		
	}
	
	function getAllEvents(req, res){
		res.send(events);
		return;
	}

	function findEventByEventId(eventId){
		for(var e in events){
			if(eventId === events[e].eventId){
				return(events[e]);
			}
		}
		return ('error');
	}

	function findEventsByMakerId(makerId){
		var eventsList = [];
			for(var e in events){
				if(makerId === events[e].makerId){
					eventsList.push(events[e]);
				}
			}
			return (eventsList);
	}

	function addNewEvent(req, res){
		var newEvent = req.body;
		events.push(newEvent);
		res.send(newEvent);
	}

	function updateEvent(req, res){
		var eventId = req.query.eventId;
		var newEvent = req.body;
		for(var e in events){
			if (events[e].eventId === eventId){
				events[e].name = newEvent.name;
				events[e].category = newEvent.category;
				events[e].subcategory = newEvent.subcategory;
				events[e].details = newEvent.details;
				res.send(events[e]);
				return;
			}
		}
		res.send('error');
	}

	function removeEvent(req, res){
		var eventId = req.query.eventId;
		for(var e in events){
			if(eventId === events[e].eventId){
				events.splice(e, 1);
				res.send('event deleted');
				return;
			}
		}
	}




};