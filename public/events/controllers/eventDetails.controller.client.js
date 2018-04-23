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
					model.error1 = 'Please login or register to register on this event';
				} else {
					var userId = $rootScope.loggedUser._id;
					userService.addEventToUserEventsList(event, userId)
						.then(function (response){
						// userId = response.data.userId;
						console.log(response.data);
						if(response.data === 'already registered'){
							model.error2 = 'You already registered for this event';
							return;
						}
						$location.url('/userProfile/'+userId);
					});
				}
			}
		}

})();