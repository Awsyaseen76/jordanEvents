var mongoose = require('mongoose');
var usersSchema = mongoose.Schema({
	userType: {type: String, default: 'user'},
	name: String,
	email: String,
	password: String,
	profileImage: {},	
	registeredEventsList: [{type: mongoose.Schema.Types.ObjectId, ref:'eventsDB'}]
}, {collection: 'users'});

module.exports = usersSchema;