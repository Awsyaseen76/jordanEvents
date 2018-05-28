var mongoose = require('mongoose');
var usersSchema = require('./users.schema.server.js');

var usersDB = mongoose.model('usersDB', usersSchema);

module.exports = usersDB;

usersDB.addNewUser = addNewUser;
usersDB.loginUser = loginUser;
usersDB.getAllUsers = getAllUsers;
usersDB.findUserById = findUserById;
usersDB.findUserByEmail = findUserByEmail;
usersDB.addEventId = addEventId;
usersDB.removeEventFromList = removeEventFromList;
usersDB.findUserByGoogleId = findUserByGoogleId;
usersDB.addEventToUserEventsList = addEventToUserEventsList;
usersDB.removeRegisteredEvent = removeRegisteredEvent;
usersDB.addProfileImage = addProfileImage;


function addProfileImage(userId, profileImage){
	return usersDB
				.findUserById(userId)
				.then(function(user){
					user.profileImage = profileImage;
					return user.save();
				});
}



function findUserByGoogleId(googleId){
	return usersDB.findOne({'google.id' : googleId});
}

function addNewUser(user){
	return usersDB.create(user);
}

function loginUser(username, password){
	return usersDB.findOne({email: username, password: password});
}

function getAllUsers(){
	return usersDB
				.find()
				.populate('events')
				.populate('registeredEventsList')
				.exec();
}

function findUserById(userId){
	return usersDB
				.findById(userId)
				.populate('events')
				.populate('registeredEventsList')
				.exec();
}

function findUserByEmail(userEmail){
	return usersDB.findOne({email: userEmail});
}

function addEventId(userId, eventId){
	return findUserById(userId)
		.then(function(user){
			user.events.push(eventId);
			return user.save();
		});
}

function addEventToUserEventsList(userId, eventId){
	return findUserById(userId)
				.then(function(user){
					user.registeredEventsList.push(eventId);
					return user.save();
		});
}


function removeRegisteredEvent(userId, eventId){
	return usersDB
		.findById(userId)
		.then(function(user){
			var index = user.registeredEventsList.indexOf(eventId);
			user.registeredEventsList.splice(index, 1);
			return user.save();
		});
}

function removeEventFromList(userId, eventId){
	return usersDB
		.findById(userId)
		.then(function(user){
			var index = user.events.indexOf(eventId);
			user.events.splice(index, 1);
			return user.save();
		});
}

