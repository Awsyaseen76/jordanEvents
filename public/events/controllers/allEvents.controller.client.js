(function(){
	angular
		.module('jordanEvents')
		.controller('allEventsController', allEventsController);

	function allEventsController(eventsService){
		var model = this;
		
		function init(){
			model.eventsList = eventsService.allEvents;
		}
		init();
	}
})();