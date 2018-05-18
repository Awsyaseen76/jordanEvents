var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/jordaneventsemifinal'; // for local

// check if running remotely
// if(process.env.MLAB_USERNAME) { 
//         var username = process.env.MLAB_USERNAME;
//         var password = process.env.MLAB_PASSWORD;
//         connectionString = 'mongodb://' + username + ':' + password;
//         connectionString += '@ds115340.mlab.com:15340/jordanevents';
// }

mongoose.connect(connectionString);


