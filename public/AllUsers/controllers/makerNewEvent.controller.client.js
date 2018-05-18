(function(){
	angular
		.module('jordanEvents')
		.controller('makerNewEventController', makerNewEventController);

		function makerNewEventController($location, eventsService, loggedMaker, userService){
			var model = this;
			function init(){
				model.loggedMaker = loggedMaker;
				eventsService.findEventsByMakerId(loggedMaker._id)
				.then(function(events){
					model.eventsList = events;
				});
			}
			init();
			var _makerId = loggedMaker._id;
			
			model.createEvent = createEvent;
			model.logout = logout;

			function logout(){
				userService
					.logout()
					.then(function(){
						$location.url('/');
					});
			}
			
			

			function createEvent(newEvent){
				newEvent.makerId = _makerId;
				eventsService.addNewEvent(newEvent)
					.then(function(addedEvent){
						$location.url('/makerProfile/eventsList');
					});
			}
		}
})();