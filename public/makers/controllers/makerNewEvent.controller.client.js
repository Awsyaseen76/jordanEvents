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
			
			model.createEvent = createEvent;
			
			eventsService.findEventsByMakerId(_makerId)
				.then(function(event){
					model.eventsList = event;
				});

			function createEvent(newEvent){
				newEvent.makerId = _makerId;
				eventsService.addNewEvent(newEvent)
					.then(function(addedEvent){
						console.log(addedEvent);
						$location.url('/makerProfile/{{_makerId}}/eventsList');
					});
			}
		}
})();