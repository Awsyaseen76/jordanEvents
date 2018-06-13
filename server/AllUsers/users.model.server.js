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
usersDB.addTokenToUser = addTokenToUser;
usersDB.findUserByToken = findUserByToken;
usersDB.resetPassword = resetPassword;
usersDB.updateProfile = updateProfile;

function updateProfile(updatedProfile){
	return usersDB
			.findByIdAndUpdate(updatedProfile._id, updatedProfile)
			.then(function(result){
				return result;
			})
}

function resetPassword(user, newPassword){
	return usersDB
			.findById(user._id)
			.then(function(user){
				user.password = newPassword;
				user.resetPasswordToken = undefined;
				user.resetPasswordExpires = undefined;
				return user.save();
			});
}

function findUserByToken(token){
	return usersDB
		.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}})
		.then(function(user){
			return user;
		}, function(err){
			console.log(err);
			return err;
		});
}


function addTokenToUser(userEmail, token){
	return usersDB
			.findUserByEmail(userEmail)
			.then(function(user){
				user.resetPasswordToken = token;
        		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        		return user.save();
		}, function(err){
			console.log(err);
		});
}
		


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

