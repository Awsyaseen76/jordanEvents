(function(){
	angular
		.module('jordanEvents')
		.controller('makerNewEventController', makerNewEventController);

		function makerNewEventController($routeParams, $location, eventsService){
			var model = this;
			function init(){
			}
			init();
			var _makerId = $routeParams.makerId;
			
			model.eventsList = eventsService.findEventsByMakerId(_makerId);
			model.createEvent = createEvent;

			function createEvent(newEvent){
				newEvent.makerId = _makerId;
				eventsService.addNewEvent(newEvent);
				$location.url('/makerProfile/{{_makerId}}/eventsList');
			}
		}
})();