var mongoose = require('mongoose');
var usersSchema = require('./users.schema.server.js');

var usersDB = mongoose.model('usersDB', usersSchema);

module.exports = usersDB;

usersDB.findUserByEmail = findUserByEmail;
usersDB.addNewUser = addNewUser;
usersDB.loginUser = loginUser;
usersDB.findUserbyId = findUserbyId;
usersDB.getAllUsers = getAllUsers;
usersDB.addEventToUserEventsList = addEventToUserEventsList;
usersDB.removeRegisteredEvent = removeRegisteredEvent;


function findUserByEmail(userEmail){
	return usersDB.findOne({email: userEmail});
}


function addNewUser(newUser){
	return usersDB.create(newUser);
}


function loginUser(username, password){
	return usersDB.findOne({email: username, password: password});
}


function findUserbyId(userId){
	return usersDB
			.findById(userId)
			.populate('registeredEventsList')
			.exec();
}


function getAllUsers(){
	return usersDB.find();
}


function addEventToUserEventsList(userId, eventId){
	return findUserbyId(userId)
		.then(function(user){
			user.registeredEventsList.push(eventId);
			return user.save();
		});
}


function removeRegisteredEvent(userId, eventId){
	return usersDB.findById(userId)
				.then(function(user){
					var index = user.registeredEventsList.indexOf(eventId);
					user.registeredEventsList.splice(index, 1);
					return user.save();
				});
}