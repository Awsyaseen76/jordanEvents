var mongoose = require('mongoose');

// var bcrypt   = require('bcrypt-nodejs');

var usersSchema = mongoose.Schema({
	userType: {
		type: String, 
		default: 'user', 
		enum:['user', 'maker', 'admin', 'superadmin']},
	password: String,
	name:{
		firstName: String,
		middleName: String,
		lastName: String
	},
	email: String,
	profileImage: {
		type: String,
		default: "/img/profileImages/avatar.png"
	},
	events: [{type: mongoose.Schema.Types.ObjectId, ref: 'eventsDB'}],
	registeredEventsList: [{type: mongoose.Schema.Types.ObjectId, ref:'eventsDB'}],
	google: {
        id: String,
        token: String
    },
    gender: String,
    DOB: Date,
    grade: String,
    school: String,
    medical: {
    	medicalIssues: String,
    	problemDetails: String 
    },
    contact:{
	    father:{
	    	name: String,
	    	phone: String
	    },
	    mother:{
	    	name: String,
	    	phone: String
	    },
	    emergency:{
	    	name: String,
	    	phone: String
	    }
    },
    address: String,
    payments: [Number],
    notes: String
}, {collection: 'users'});




// methods ======================
// generating a hash
// usersSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };


// checking if password is valid
// usersSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };



module.exports = usersSchema;