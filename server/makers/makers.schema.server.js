var mongoose = require('mongoose');

// var bcrypt   = require('bcrypt-nodejs');

var makersSchema = mongoose.Schema({
	userType: {type: String, default: 'maker'},
	userName: String,
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	google: {
              id: String,
              token: String
            },
	events: [{type: mongoose.Schema.Types.ObjectId, ref: 'eventsDB'}]
}, {collection: 'makers'});




// methods ======================
// generating a hash
// makersSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };


// checking if password is valid
// makersSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };



module.exports = makersSchema;