(function(){
	angular
		.module('jordanEvents')
		.controller('userProfileController', userProfileController)

		function userProfileController(userService, $routeParams, eventsService){
			var model = this;
			function init(){
				model.hello = 'hi from the userProfileController';
				var _userId = $routeParams.userId;
				model.userProfile = userService.findUserbyId(_userId);
				if (model.userProfile === null){
					model.error = 'Please login to view your profile details';
					return;
				} else {
					model.error=null;
					return model.userProfile;
				}
			}
			init();

			model.removeRegisteredEvent = removeRegisteredEvent;

			function removeRegisteredEvent(eventId){
				var _userId = $routeParams.userId;
				userService.removeRegisteredEvent(_userId, eventId);
			}

		}
})();