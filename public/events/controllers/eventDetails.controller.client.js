(function(){
	angular
		.module('jordanEvents')
		.controller('eventDetailsController', eventDetailsController);

		function eventDetailsController($routeParams, eventsService, $rootScope, userService, $location){
			var model = this;

			function init(){
				var eventId = $routeParams.eventId;
				// var eventDetails = eventsService.findEventByEventId(eventId);
				eventsService.findEventByEventId(eventId)
					.then(function(eventDetails){
						model.eventDetails = eventDetails;
					});
			}
			init();

			model.eventRegistration = eventRegistration;

			function eventRegistration(event){
				if (!$rootScope.loggedUser){
					model.error = true;
				} else {
					var userId = $rootScope.loggedUser.userId;
					userService.addEventToUserEventsList(event, userId)
						.then(function (response){
						userId = response.data.userId;
						$location.url('/userProfile/'+userId);
					});
				}
			}
		}

})();