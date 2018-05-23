(function(){
	angular
		.module('jordanEvents')
		.controller('allEventsController', allEventsController);

	function allEventsController(eventsService, userService, $location){
		var model = this;
		
		function init(){
			eventsService
				.getAllEvents()
				.then(function(events){
					model.eventsList = events;		
				});

			userService
					.checkUserLogin()
					.then(function(result){
						if(result){
							model.loggedUser = result;
						}
					});
		}
		init();

		model.logout = logout;

		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
				});
		}

	}
})();