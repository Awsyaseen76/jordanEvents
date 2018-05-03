(function(){
	angular
		.module('jordanEvents')
		.controller('eventDetailsController', eventDetailsController);

		function eventDetailsController($routeParams, eventsService, $rootScope, userService, makerService, $location){
			var model = this;

			function init(){
				var eventId = $routeParams.eventId;
				// var eventDetails = eventsService.findEventByEventId(eventId);
				eventsService.findEventByEventId(eventId)
					.then(function(eventDetails){
						model.eventDetails = eventDetails;
					});
				// check if there any user has already logged in to use it instead of the $rootScope
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

			model.eventRegistration = eventRegistration;

			function eventRegistration(event){
				if (model.loggedUser === '0'){
					model.error1 = 'Please login or register to register on this event';
				} else {
					var userId = model.loggedUser._id;
					userService.addEventToUserEventsList(event, userId)
						.then(function (response){
						if(response.data === 'already registered'){
							model.error2 = 'You already registered for this event';
							return;
						}
						$location.url('/userProfile');
					});
				}
			}
		}

})();