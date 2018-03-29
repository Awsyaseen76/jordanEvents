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
			model.eventsList = eventsService.findEventsByMakerId(loggedMakerId);
		}
		init();

		model.removeEvent = removeEvent;

		function removeEvent(eventId){
			var makerId = $rootScope.loggedMaker.makerId;
			var removedEvent = eventsService.removeEvent(eventId);
			var url = "/makerProfile/" + makerId;
			$location.url(url);
		}
	}
})();