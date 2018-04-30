var mongoose = require('mongoose');
var makersSchema = require('./makers.schema.server.js');

var makersDB = mongoose.model('makersDB', makersSchema);

module.exports = makersDB;

makersDB.addNewMaker = addNewMaker;
makersDB.loginMaker = loginMaker;
makersDB.getAllMakers = getAllMakers;
makersDB.findMakerById = findMakerById;
makersDB.findMakerByEmail = findMakerByEmail;
makersDB.addEventId = addEventId;
makersDB.removeEventFromList = removeEventFromList;

function addNewMaker(maker){
	return makersDB.create(maker);
}

function loginMaker(username, password){

	return makersDB.findOne({email: username, password: password});
}

function getAllMakers(){
	return makersDB.find();
}

function findMakerById(makerId){
	return makersDB.findById({_id: makerId});
}

function findMakerByEmail(makerEmail){
	return makersDB.findOne({email: makerEmail});
}

function addEventId(makerId, eventId){
	findMakerById(makerId)
		.then(function(maker){
			maker.events.push(eventId);
			return maker.save();
		});
}

function removeEventFromList(makerId, eventId){
	makersDB
		.findById(makerId)
		.then(function(maker){
			var index = maker.events.indexOf(eventId);
			maker.events.splice(index, 1);
			return maker.save();
		});
}

