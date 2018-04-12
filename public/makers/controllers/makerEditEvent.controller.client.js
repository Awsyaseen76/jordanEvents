(function () {
	angular
		.module('jordanEvents')
		.controller('makerEditEventController', makerEditEventController);

	function makerEditEventController(eventsService, $rootScope, $location){
		var model = this;

		function init(){
			var loggedMakerId = $rootScope.loggedMaker.makerId;
			eventsService.findEventsByMakerId(loggedMakerId)
				.then(function(events){
					model.eventsList = events;
				});
			model.selectedEvent = null;
			// console.log(model.eventsList);
		}
		init();

		model.updateEvent = updateEvent;
		model.selectEvent = selectEvent;

		function updateEvent(newEvent){
			var eventId = model.selectedEvent.eventId;
			eventsService.updateEvent(newEvent, eventId)
				.then(function(updatedEvent){
					console.log(updatedEvent);
					var url = "/makerProfile/" + updatedEvent.makerId;
					$location.url(url);
				});
		}

		function selectEvent(eventId){
			eventsService.findEventByEventId(eventId)
				.then(function(event){
					// model.foundEvent = event;
					console.log(event);
					model.selectedEvent = event;
				});
			// return model.foundEvent;
		}

	}
})();