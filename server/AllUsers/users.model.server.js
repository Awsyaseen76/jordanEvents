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
usersDB.makePayment = makePayment;
usersDB.confirmAttendance = confirmAttendance;


function confirmAttendance(totalAttended){
	return usersDB
		.findById(totalAttended.userId)
		.then(function(user){
			user.attendedEvents.push({eventId: totalAttended.eventId, 
									  date: totalAttended.date, 
									  attended: totalAttended.attended
									});
			return user.save();
		});





	// var results = [];
	// return usersDB
	// 	.findById(totalAttended.userId)
	// 	.then(function(user){
	// 		function asyncLoop(i, cb) {
	// 		    if (i < user.attendedEvents.length) {
	// 		    	if(user.attendedEvents[i].eventId === totalAttended.eventId){
	// 		    		user.attendedEvents[i].dates.push({date: totalAttended.date, attended: totalAttended.attended});
	// 					results.push(user.save());
	// 					return results;
	// 		    	}
	// 				asyncLoop(i+1, cb);
	// 		    } else {
	// 		    	user.attendedEvents.push(
	// 									{eventId: totalAttended.eventId, 
	// 									 dates: [
	// 									 		{date: totalAttended.date, attended: totalAttended.attended}
	// 									 		]
	// 									});
	// 				results.push(user.save());
	// 		        cb();
	// 		    }
	// 		}
	// 		asyncLoop(0, function(){
	// 		    return results;
	// 		});
	// 	});






		// 	for(var i in user.attendedEvents){
		// 		if(user.attendedEvents[i].eventId === totalAttended.eventId &&
		// 			user._id.toString() === totalAttended.userId){
		// 			user.attendedEvents[i].dates.push({date: totalAttended.date, attended: totalAttended.attended});
		// 			return user.save();
		// 		}
		// 	}
		// 	if(user._id.toString() === totalAttended.userId){
		// 		user.attendedEvents.push(
		// 								{eventId: totalAttended.eventId, 
		// 								 dates: [
		// 								 		{date: totalAttended.date, attended: totalAttended.attended}
		// 								 		]
		// 								});
		// 		return user.save();
		// 	}

		// 	// user.attendedEvents.push({eventId: totalAttended.eventId, date: totalAttended.date, attended: totalAttended.attended})
		// 	// return user.save();
		// });
	// var result = [];
	// return (function(){
	// 	for(var i in totalAttended){
	// 		usersDB
	// 			.findOneAndUpdate(
	// 				   { _id:  totalAttended[i].userId}, 
	// 				   { $push: { attendedEvents: totalAttended[i]  } },
	// 				  function (error, success) {
	// 				        if (error) {
	// 				            result = error;
	// 				            return result;
	// 				        } else {
	// 				            result.push('success');
	// 				            if(i == totalAttended.length-1){
	// 				            	console.log('successfullllllllllllly');
	// 				            	return result;
	// 				            }
	// 				        }
	// 				    });
	// 	}
	// })();
}


function makePayment(payment){
	return usersDB
				.findById(payment.userId)
				.then(function (user){
					user.payments.push(
								{eventId: payment.eventId,
								 paymentDate: payment.dateOfpayment,
								 paymentAmount: JSON.parse(payment.amount)});
					return user.save();
				});
				// 	if(user.totalOfPayments.length === 0){
				// 		user.totalOfPayments.push({
				// 			eventId: payment.eventId,
				// 			totalAmount: JSON.parse(payment.amount)
				// 		});
				// 		return user.save();
				// 	}
				// 	for(var i in user.totalOfPayments){
				// 		console.log(user.totalOfPayments[i].eventId === payment.eventId);
				// 		if(user.totalOfPayments[i].eventId === payment.eventId){
				// 			var totalPayment = user.totalOfPayments[i].totalAmount + JSON.parse(payment.amount);
				// 			console.log(totalPayment);
				// 			user.set({
				// 				totalOfPayments[i].eventId: payment.eventId,
				// 				totalOfPayments[i].totalAmount: totalPayment
											
				// 			});
				// 			// user.totalOfPayments[i].totalAmount = JSON.parse(payment.amount)
				// 			console.log(user.totalOfPayments[i].totalAmount)
				// 			return user.save();
				// 		}
				// 	}
				// 	console.log('im here');
				// 	user.totalOfPayments.push({
				// 		eventId: payment.eventId,
				// 		totalAmount: JSON.parse(payment.amount)
				// 	})	
				// 	return user.save();
				// })
}



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

