(function(){
	angular
		.module('jordanEvents')
		.controller('userProfileController', userProfileController);

		function userProfileController(userService, $routeParams, eventsService, $location){
			var model = this;
			function init(){
				var _userId = $routeParams.userId;
				getUserProfile(_userId);
			}
			init();

			
			model.getUserProfile = getUserProfile;
			model.removeRegisteredEvent = removeRegisteredEvent;

			function getUserProfile(userId){
				userService.findUserbyId(userId)
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

			function removeRegisteredEvent(eventId){
				var _userId = $routeParams.userId;
				userService.removeRegisteredEvent(_userId, eventId)
					.then(function(response){
						getUserProfile(_userId);
					});
			}

		}
})();