(function() {
	angular
		.module('jordanEvents')
		.controller('makerEventsListController', makerEventsListController);

	function makerEventsListController($rootScope, eventsService) {
		var model = this;

		function init() {
			// model.loggedMaker = $rootScope.loggedMaker;
			var loggedMakerId = $rootScope.loggedMaker.makerId;
			model.eventsList = eventsService.findEventsByMakerId(loggedMakerId);
		}
		init();
	}
})();