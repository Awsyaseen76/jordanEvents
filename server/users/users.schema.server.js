var mongoose = require('mongoose');
var usersSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	registeredEventsList: [{type: mongoose.Schema.Types.ObjectId, ref:'eventsDB'}]
}, {collection: 'users'});

module.exports = usersSchema;