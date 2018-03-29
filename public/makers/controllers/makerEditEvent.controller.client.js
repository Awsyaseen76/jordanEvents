(function () {
	angular
		.module('jordanEvents')
		.controller('makerEditEventController', makerEditEventController);

	function makerEditEventController(eventsService, $rootScope){
		var model = this;

		function init(){
			var loggedMakerId = $rootScope.loggedMaker.makerId;
			model.eventsList = eventsService.findEventsByMakerId(loggedMakerId);
			model.selectedEvent = null;
		}
		init();

		model.updateEvent = updateEvent;
		model.selectEvent = selectEvent;

		function updateEvent(newEvent){
			var eventId = model.selectedEvent;
			var updatedEvent = eventsService.updateEvent(newEvent, eventId);
		}

		function selectEvent(eventId){
			var foundEvent = eventsService.findEventByEventId(eventId);
			model.selectedEvent = foundEvent;
			// return model.foundEvent;
		}

	}
})();