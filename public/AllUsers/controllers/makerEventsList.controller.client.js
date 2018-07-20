(function() {
	angular
		.module('jordanEvents')
		.controller('makerEventsListController', makerEventsListController);

	function makerEventsListController(eventsService, $location, loggedMaker, userService) {
		var model = this;

		function init() {
			model.loggedMaker = loggedMaker;
			// var makerName = loggedMaker.name;
			// var loggedMakerId = loggedMaker._id;
			// model.makerName = makerName;
			// model.makerId = loggedMakerId;
			eventsService
				.findEventsByMakerId(loggedMaker._id)
				.then(function(events){
					model.eventsList = events;
				});

			
			// userService
			// 		.checkUserLogin()
			// 		.then(function(result){
			// 			if(result){
			// 				model.loggedUser = result;
			// 			}
			// 		});

		}
		init();

		model.removeEvent = removeEvent;
		model.logout = logout;
		// model.findUserByEventId = findUserByEventId

		// function findUserByEventId(eventId){
		// 	console.log(eventId);
		// }

		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
				});
		}


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