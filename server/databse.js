var mongoose = require('mongoose');

// var connectionString = 'mongodb://localhost/jordaneventsemifinal'; // for local

// check if running remotely
// if(process.env.MLAB_USERNAME) { 
        var username = process.env.MLAB_USERNAME;
        var password = process.env.MLAB_PASSWORD;
        var connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds147920.mlab.com:47920/heroku_sqjcbg63';
// }
mongoose.connect(connectionString);

//mongodb://<dbuser>:<dbpassword>@ds147920.mlab.com:47920/heroku_sqjcbg63
