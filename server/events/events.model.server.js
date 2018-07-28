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
eventsDB.addMemberToEvent = addMemberToEvent;
eventsDB.addToDiscountedMembers = addToDiscountedMembers;


function addToDiscountedMembers(discount){
	var eventId = discount.eventId;
	return eventsDB
				.findById(eventId)
				.then(function(event){
					for(var u in event.discountedMembers){
						if(event.discountedMembers[u].userId === discount.userId){
							var err = 'You Already had a '+ event.discountedMembers[u].discountType+'!'
							return (err);
						}else{
							event.discountedMembers.push(discount);
							return event.save();
							
						}
					}
				});
}


function addMemberToEvent(eventId, userId){
	return eventsDB
			.findById(eventId)
			.then(function(event){
				event.registeredMembers.push(userId);
				return event.save();
			});
}


function findEventByEventId(eventId){
	return eventsDB
				.findById(eventId)
				.populate('registeredMembers')
				.exec();
}

function findEventsByMakerId(makerId){
	return eventsDB
				.find({makerId: makerId})
				.sort('startingDate')
				.populate('registeredMembers')
				.exec();
}

function getAllEvents(){
	var today = (new Date()).toISOString();
	return eventsDB
				.find({
					startingDate: {$gt: today}
				})
				.sort('startingDate')
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