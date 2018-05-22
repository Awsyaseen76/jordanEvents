var mongoose = require('mongoose');
var eventsSchema = require('./events.schema.server.js');

var usersDB = require('../AllUsers/users.model.server.js');

var eventsDB = mongoose.model('eventsDB', eventsSchema);

module.exports = eventsDB;

eventsDB.findEventByEventId = findEventByEventId;
eventsDB.findEventsByMakerId = findEventsByMakerId;
eventsDB.getAllEvents = getAllEvents;
eventsDB.addNewEvent = addNewEvent;
eventsDB.updateEvent = updateEvent;
eventsDB.removeEvent = removeEvent;
eventsDB.updateEventByAdmin = updateEventByAdmin;


function findEventByEventId(eventId){
	return eventsDB.findById(eventId);
}

function findEventsByMakerId(makerId){
	return eventsDB.find({makerId: makerId});
}

function getAllEvents(){
	return eventsDB
				.find()
				.populate('makerId')
				.exec();
}

function addNewEvent(makerId, event){
	var eventTemp = null;
	return eventsDB
				.create(event)
				.then(function(addedEvent){
					eventTemp = addedEvent;
					return usersDB.addEventId(makerId, addedEvent._id);
				})
				.then(function(maker){
					return eventTemp;
				});
}


function updateEventByAdmin(eventId, updatedEvent){
	return eventsDB.update({_id: eventId}, {$set: updatedEvent});
}


function updateEvent(eventId, updatedEvent){
	return eventsDB.update({_id: eventId}, {$set: updatedEvent});
}

function removeEvent(makerId, eventId){
	return eventsDB
				.remove({_id: eventId})
				.then(function(status){
					return usersDB.removeEventFromList(makerId, eventId);
				})
				.then(function(removedEvent){
					return removedEvent;
				});
}