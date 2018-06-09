(function () {
	angular
		.module('jordanEvents')
		.controller('makerEditEventController', makerEditEventController);

	function makerEditEventController(eventsService, $location, loggedMaker, userService){
		var model = this;

		function init(){
			model.loggedMaker = loggedMaker;
			eventsService
				.findEventsByMakerId(loggedMaker._id)
				.then(function(events){
					model.eventsList = events;
				});
			model.selectedEvent = null;

			// userService
			// 		.checkUserLogin()
			// 		.then(function(result){
			// 			if(result){
			// 				model.loggedUser = result;
			// 			}
			// 		});
		}
		init();

		model.updateEvent = updateEvent;
		model.selectEvent = selectEvent;
		model.logout = logout;

		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
				});
		}

		function updateEvent(newEvent){
			var eventId = model.selectedEvent._id;
			eventsService.updateEvent(newEvent, eventId)
				.then(function(updatedEvent){
					var url = "/makerProfile";
					$location.url(url);
				});
		}

		function selectEvent(eventId){
			eventsService.findEventByEventId(eventId)
				.then(function(event){
					// model.foundEvent = event;
					model.selectedEvent = event;
				});
			// return model.foundEvent;
		}

	}
})();