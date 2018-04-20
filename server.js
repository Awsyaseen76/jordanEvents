var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


// connecting to the database
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/jordanevents');

// var makersSchema = new mongoose.Schema({
// 	name: String,
// 	email: String,
// 	password: String
// }, {collection: 'makers'});

// var makers = mongoose.model('makers', makersSchema);

// app.get('/api/getMakers', function(req, res){
// 	makers.find(function(error, data){
// 		res.send(data);
// 	});
// });

// function addMaker(){
// 	newMaker = new makers({name: 'Maker400', email: 'maker400@email.com', password: '400'});
// 	newMaker.save(function(error, data){
// 		console.log(data);
// 	});
// }

// addMaker();

// function showMakers(){
// 	makers.find({name: 'Maker400'},function(error, data){
// 		console.log(data);
// 	});
// }



// console.log(showMakers());

/* the following is like 
var func = require('./server/app');
func(app)
*/

require('./server/users/user.service.server')(app);
require('./server/makers/maker.service.server')(app);
require('./server/events/event.service.server')(app);
require('./server/databse.js');


app.listen(3000, function() {
	console.log('connected to localhost 3000');
});
