var mongoose = require('mongoose');
var eventsSchema = require('./events.schema.server.js');

var makersDB = require('../makers/makers.model.server.js');

var eventsDB = mongoose.model('eventsDB', eventsSchema);

module.exports = eventsDB;

eventsDB.findEventByEventId = findEventByEventId;
eventsDB.findEventsByMakerId = findEventsByMakerId;
eventsDB.getAllEvents = getAllEvents;
eventsDB.addNewEvent = addNewEvent;
eventsDB.updateEvent = updateEvent;
eventsDB.removeEvent = removeEvent;


function findEventByEventId(eventId){
	return eventsDB.findById(eventId);
}

function findEventsByMakerId(makerId){
	return eventsDB.find({makerId: makerId});
}

function getAllEvents(){
	return eventsDB.find();
}

function addNewEvent(makerId, event){
	var eventTemp = null;
	return eventsDB
				.create(event)
				.then(function(addedEvent){
					eventTemp = addedEvent;
					return makersDB.addEventId(makerId, addedEvent._id);
				})
				.then(function(maker){
					return eventTemp;
				});
}

function updateEvent(eventId, updatedEvent){
	return eventsDB.update({_id: eventId}, {$set: updatedEvent});
}

function removeEvent(makerId, eventId){
	return eventsDB
				.remove({_id: eventId})
				.then(function(status){
					return makersDB.removeEventFromList(makerId, eventId);
				})
				.then(function(removedEvent){
					return removedEvent;
				});
}