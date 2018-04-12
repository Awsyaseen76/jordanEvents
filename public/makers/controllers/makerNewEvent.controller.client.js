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
			
			
			eventsService.findEventsByMakerId(_makerId)
				.then(function(event){
					model.eventsList = event;
				});
			model.createEvent = createEvent;

			function createEvent(newEvent){
				newEvent.makerId = _makerId;
				eventsService.addNewEvent(newEvent)
					.then(function(){
						$location.url('/makerProfile/{{_makerId}}/eventsList');
					});
			}
		}
})();