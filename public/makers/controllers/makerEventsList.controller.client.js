(function() {
	angular
		.module('jordanEvents')
		.controller('makerEventsListController', makerEventsListController);

	function makerEventsListController($rootScope, eventsService, $location, loggedMaker, userService, makerService) {
		var model = this;

		function init() {
			var makerName = loggedMaker.name;
			var loggedMakerId = loggedMaker._id;
			model.makerName = makerName;
			model.makerId = loggedMakerId;
			eventsService.findEventsByMakerId(loggedMakerId)
				.then(function(events){
					model.eventsList = events;
					// return model.eventsList;
				});

			userService
					.checkUserLogin()
					.then(function(result){
						if(result){
							model.loggedUser = result;
						}
					});

			makerService
					.checkMakerLogin()
					.then(function(result){
						if(result){
							model.loggedMaker = result;
						}
					});

		}
		init();

		model.removeEvent = removeEvent;

		function removeEvent(makerId, eventId){
			//var makerId = $rootScope.loggedMaker._id;
			eventsService.removeEvent(makerId, eventId)
				.then(function(deleted){
					var url = "/makerProfile";
					$location.url(url);
				});
		}
	}
})();