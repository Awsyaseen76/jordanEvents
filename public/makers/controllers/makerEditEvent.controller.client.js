(function () {
	angular
		.module('jordanEvents')
		.controller('makerEditEventController', makerEditEventController);

	function makerEditEventController(eventsService, $rootScope, $location){
		var model = this;

		function init(){
			var loggedMakerId = $rootScope.loggedMaker._id;
			eventsService.findEventsByMakerId(loggedMakerId)
				.then(function(events){
					model.eventsList = events;
				});
			model.selectedEvent = null;
		}
		init();

		model.updateEvent = updateEvent;
		model.selectEvent = selectEvent;

		function updateEvent(newEvent){
			var eventId = model.selectedEvent._id;
			eventsService.updateEvent(newEvent, eventId)
				.then(function(updatedEvent){
					var url = "/makerProfile/" + updatedEvent.makerId;
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