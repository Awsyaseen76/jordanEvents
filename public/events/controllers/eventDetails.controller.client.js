(function(){
	angular
		.module('jordanEvents')
		.controller('eventDetailsController', eventDetailsController);

		function eventDetailsController($routeParams, eventsService, $rootScope, userService, $location){
			var model = this;

			function init(){
				var eventId = $routeParams.eventId;
				var eventDetails = eventsService.findEventByEventId(eventId);
				model.eventDetails = eventDetails;
			}
			init();

			model.eventRegistration = eventRegistration;

			function eventRegistration(event){
				console.log($rootScope.loggedUser);
				if (!$rootScope.loggedUser){
					model.error = true;
				} else {
					var userId = $rootScope.loggedUser.userId;
					userService.addEventToUserEventsList(event, userId);
					$location.url('/userProfile/'+userId);
				}
			}
		}

})();