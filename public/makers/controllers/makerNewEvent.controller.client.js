(function(){
	angular
		.module('jordanEvents')
		.controller('makerNewEventController', makerNewEventController);

		function makerNewEventController($routeParams, $location, eventsService, loggedMaker, userService, makerService){
			var model = this;
			function init(){
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
			var _makerId = loggedMaker._id;
			
			model.createEvent = createEvent;
			
			eventsService.findEventsByMakerId(_makerId)
				.then(function(event){
					model.eventsList = event;
				});

			function createEvent(newEvent){
				newEvent.makerId = _makerId;
				eventsService.addNewEvent(newEvent)
					.then(function(addedEvent){
						$location.url('/makerProfile/eventsList');
					});
			}
		}
})();