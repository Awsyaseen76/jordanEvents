var eventsDB = require('./events.model.server.js');

module.exports = function(app) {

		// var events = [{
		// 	'eventId': '1',
		// 	'name': 'football',
		// 	'category': 'sport',
		// 	'subcategory': 'football',
		// 	'makerId': '111',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '2',
		// 	'name': 'football jordan',
		// 	'category': 'sport',
		// 	'subcategory': 'football',
		// 	'makerId': '111',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '3',
		// 	'name': 'football junior',
		// 	'category': 'sport',
		// 	'subcategory': 'football',
		// 	'makerId': '111',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '4',
		// 	'name': 'tenis',
		// 	'category': 'sport',
		// 	'subcategory': 'tenis',
		// 	'makerId': '222',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '5',
		// 	'name': 'tenis for adults',
		// 	'category': 'sport',
		// 	'subcategory': 'tenis',
		// 	'makerId': '222',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '6',
		// 	'name': 'tenis for girls',
		// 	'category': 'sport',
		// 	'subcategory': 'tenis',
		// 	'makerId': '222',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '7',
		// 	'name': 'badminton',
		// 	'category': 'sport',
		// 	'subcategory': 'badminton',
		// 	'makerId': '333',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '8',
		// 	'name': 'badminton for girls',
		// 	'category': 'sport',
		// 	'subcategory': 'badminton',
		// 	'makerId': '333',
		// 	'details': 'deteils of the events written by the event maker'
		// }];

	

	// http handlers
	app.get('/api/allEvents', getAllEvents);
	// app.get('/api/event/:eventId', findEvent);
	// app.get('/api/event/', findEvent);
	app.get('/api/makerEvents/:makerId', findEventsByMakerId);
	app.get('/api/event/:eventId', findEventByEventId);
	app.post('/api/event/', addNewEvent);
	app.put('/api/event/', updateEvent);
	app.delete('/api/event/', removeEvent);



	// function findEvent(req, res){
	// 	if(req.query.eventId){
	// 		res.send(eventsDB
	// 					.findEventByEventId(req.query.eventId)
	// 					.then(function(event){
	// 						res.send(event);
	// 						return;
	// 					})
	// 				);
	// 	}
	// 	if(req.query.makerId){
	// 		res.send(eventsDB
	// 					.findEventsByMakerId(req.query.makerId)
	// 					.then(function(event){
	// 						res.send(event);
	// 						return;
	// 					})
	// 				);
	// 		return;
	// 	}
		
	// }
	
	function findEventsByMakerId(req, res){
		var makerId = req.params.makerId;

		eventsDB
			.findEventsByMakerId(makerId)
			.then(function(events){
				res.send(events);
				return;
			});

	}

	function findEventByEventId(req, res){
		var eventId = req.params.eventId;
		eventsDB
			.findEventByEventId(eventId)
			.then(function(event){
				res.send(event);
				return;
			});
	}

	function getAllEvents(req, res){
		eventsDB
			.getAllEvents()
			.then(function(result){
				res.send(result);
				return;
			});
	}

	// function findEventByEventId(eventId){
	// 	eventsDB
	// 		.findEventByEventId(eventId)
	// 		.then(function(foundEvent){
	// 			return foundEvent;
	// 		});
		// for(var e in events){
		// 	if(eventId === events[e].eventId){
		// 		return(events[e]);
		// 	}
		// }
		// return ('error');
	// }

	// function findEventsByMakerId(makerId){
	// 	var eventsList = [];
	// 		for(var e in events){
	// 			if(makerId === events[e].makerId){
	// 				eventsList.push(events[e]);
	// 			}
	// 		}
	// 		return (eventsList);
	// }

	function addNewEvent(req, res){
		var newEvent = req.body;
		var makerId = newEvent.makerId;
		// events.push(newEvent);
		eventsDB
			.addNewEvent(makerId, newEvent)
			.then(function(addedEvent){
				res.send(addedEvent);
				return;
			});
	}

	function updateEvent(req, res){
		var eventId = req.query.eventId;
		var updatedEvent = req.body;
		eventsDB
			.updateEvent(eventId, updatedEvent)
			.then(function(status){
				// res.send(status);
				// return;
				eventsDB
					.findEventByEventId(eventId)
					.then(function(event){
						res.send(event);
						return;
					})
			});
		// for(var e in events){
		// 	if (events[e].eventId === eventId){
		// 		events[e].name = newEvent.name;
		// 		events[e].category = newEvent.category;
		// 		events[e].subcategory = newEvent.subcategory;
		// 		events[e].details = newEvent.details;
		// 		res.send(events[e]);
		// 		return;
		// 	}
		// }
		// res.send('error');
	}

	function removeEvent(req, res){
		var makerId = req.query.makerId;
		var eventId = req.query.eventId;

		eventsDB
			.removeEvent(makerId, eventId)
			.then(function(status){
				res.send(status);
				return;
			});
		// for(var e in events){
		// 	if(eventId === events[e].eventId){
		// 		events.splice(e, 1);
		// 		res.send('event deleted');
		// 		return;
		// 	}
		// }
	}




};