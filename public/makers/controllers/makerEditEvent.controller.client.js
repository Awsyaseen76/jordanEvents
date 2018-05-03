(function () {
	angular
		.module('jordanEvents')
		.controller('makerEditEventController', makerEditEventController);

	function makerEditEventController(eventsService, $rootScope, $location, loggedMaker, userService, makerService){
		var model = this;

		function init(){
			var loggedMakerId = loggedMaker._id;
			eventsService.findEventsByMakerId(loggedMakerId)
				.then(function(events){
					model.eventsList = events;
				});
			model.selectedEvent = null;

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

		model.updateEvent = updateEvent;
		model.selectEvent = selectEvent;

		function updateEvent(newEvent){
			var eventId = model.selectedEvent._id;
			eventsService.updateEvent(newEvent, eventId)
				.then(function(updatedEvent){
					var url = "/makerProfile";
					$location.url(url);
				});
		}

		function selectEvent(eventId){
			eventsService.findEventByEventId(eventId)
				.then(function(event){
					// model.foundEvent = event;
					model.selectedEvent = event;
				});
			// return model.foundEvent;
		}

	}
})();