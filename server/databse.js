var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/jordanevents'; // for local

if(process.env.MLAB_USERNAME) { // check if running remotely
        var username = process.env.MLAB_USERNAME; // get from environment
        var password = process.env.MLAB_PASSWORD;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += 'ds117010.mlab.com:17010/jordanevents'; // user yours
}

mongoose.connect(connectionString);
