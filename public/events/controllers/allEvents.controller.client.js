(function(){
	angular
		.module('jordanEvents')
		.controller('allEventsController', allEventsController);

	function allEventsController(eventsService){
		var model = this;
		
		function init(){
			eventsService.getAllEvents()
				.then(function(events){
					model.eventsList = events;		
				});
		}
		init();
	}
})();