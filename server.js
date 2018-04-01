var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



/* the following is like 
var func = require('./server/app');
func(app)
*/
require('./server/app')(app);


app.listen(3000, function() {
	console.log('connected to localhost 3000');
});
