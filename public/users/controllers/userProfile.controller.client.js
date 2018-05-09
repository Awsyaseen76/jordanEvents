(function(){
	angular
		.module('jordanEvents')
		.controller('userProfileController', userProfileController);

		// inject the current logged in user (loggedUser) as a depedancies to use it here
		function userProfileController(userService, makerService, $routeParams, eventsService, $location, loggedUser){
			var model = this;
			function init(){
				var _userId = loggedUser._id;
				getUserProfile(_userId);

				userService
					.checkUserLogin()
					.then(function(result){
						if(result){
							model.loggedUser = result;
						}
					});

				makerService
					.checkMakerLogin()
					.then(function(result){
						if(result){
							model.loggedMaker = result;
						}
					});
			}
			init();

			
			model.getUserProfile = getUserProfile;
			model.removeRegisteredEvent = removeRegisteredEvent;
			

			function getUserProfile(userId){
				userService.findUserById(userId)
					.then(function(response){
						var userProfile = response.data;
						if (userProfile === '0'){
							model.error = 'Please login to view your profile details';
							return;
						} else {
							model.error=null;
							model.userProfile = userProfile;
					}	
				});
			}

			function removeRegisteredEvent(userId, eventId){
				// var _userId = $routeParams.userId;
				userService.removeRegisteredEvent(userId, eventId)
					.then(function(response){
						getUserProfile(userId);
					});
			}

		}
})();