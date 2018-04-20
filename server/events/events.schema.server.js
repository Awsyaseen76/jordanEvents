var mongoose = require('mongoose');

var eventsSchema = mongoose.Schema({
			name: String,
			category: String,
			subcategory: String,
			details: String,
			created: {type: Date, default: Date.now()},
			makerId: {type: mongoose.Schema.Types.ObjectId, ref: 'makersDB'}
			// users:[{type: mongoose.Schema.Types.ObjectId, ref: 'usersDB'}]
}, {collection: 'events'});

module.exports = eventsSchema;