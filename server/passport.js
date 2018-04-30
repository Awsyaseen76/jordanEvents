// config/passport.js


// expose this function to our app using module.exports
module.exports = function(passport) {

    // load all the things we need
    // var LocalStrategy   = require('passport-local').Strategy;

    // load up the users and makers model
    var makersDB            = require('./makers/makers.model.server.js');
    var usersDB             = require('./users/users.model.server.js');

    // passport.use('localMaker', new LocalStrategy(makerStrategy));
    // passport.use('localUser', new LocalStrategy(userStrategy));



    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    function serializeUser(user, done) {
        done(null, user);
    }

    // used to deserialize the user
    function deserializeUser(user, done) {
        console.log('deserializeUser');
        // console.log(user);
        if(user.events){
            makersDB
                .findMakerById(user._id)
                .then(
                    function(response){
                        done(null, response);
                    },
                    function(err){
                        done(err, null);
                    }
            );  
        }else{
            usersDB
                .findUserById(user._id)
                .then(
                    function(response){
                        done(null, response);
                    },
                    function(err){
                        done(err, null);
                    }
                );
            
        }
    }

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // function makerStrategy(username, password, done) {
    //     console.log('step 4');
    //     makersDB
    //         .loginMaker(username, password)
    //         .then(
    //             function(maker){
    //                 console.log('step 5');
    //                 if(!maker){
    //                     return done(null, false);
    //                 } else {
    //                     return done(null, maker);
    //                 }
    //             },
    //             function(err){
    //                 if(err){
    //                     return done(err);
    //                 }
    //             }
    //         );
    // }



    // function userStrategy(username, password, done) {
    //     usersDB
    //         .loginUser(username, password)
    //         .then(
    //             function(user){
    //                 if(!user){
    //                     return done(null, false);
    //                 } else {
    //                     return done(null, user);
    //                 }
    //             },
    //             function(err){
    //                 if(err){
    //                     return done(err);
    //                 }
    //             }
    //         );
    // }




};
