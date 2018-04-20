var mongoose = require('mongoose');
var makersSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	events: [{type: mongoose.Schema.Types.ObjectId, ref: 'eventsDB'}]
}, {collection: 'makers'});

module.exports = makersSchema;