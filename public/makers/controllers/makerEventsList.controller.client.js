(function() {
	angular
		.module('jordanEvents')
		.controller('makerEventsListController', makerEventsListController);

	function makerEventsListController($rootScope, eventsService, $location) {
		var model = this;

		function init() {
			var makerName = $rootScope.loggedMaker.name;
			var loggedMakerId = $rootScope.loggedMaker.makerId;
			model.makerName = makerName;
			model.makerId = loggedMakerId;
			eventsService.findEventsByMakerId(loggedMakerId)
				.then(function(events){
					model.eventsList = events;
					// return model.eventsList;
				});
		}
		init();

		model.removeEvent = removeEvent;

		function removeEvent(eventId){
			var makerId = $rootScope.loggedMaker.makerId;
			eventsService.removeEvent(eventId)
				.then(function(deleted){
					var url = "/makerProfile/" + makerId;
					$location.url(url);
				});
		}
	}
})();