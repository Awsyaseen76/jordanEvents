(function(){
	angular
		.module('jordanEvents')
		.controller('homePageController', homePageController);

	function homePageController(userService, $location, eventsService, $route){
		var model = this;
		// model.position = {
		// 				currentposition: {}
		// };

		// model.eventsPlaces = [];
		// var eventsParams = [];

		function init(){
			// This make the carousel works and set the sliding time
			$(document).ready(function() {
	          $('.carousel').carousel({
	            interval: 3000
	          })
	        });
			// model.loggedUser = null;
			userService
				.checkUserLogin()
				.then(function(result){
					if(result){
						model.loggedUser = result;
						return;
					}else{
						model.loggedUser = null;
						return;
					}
				});

			eventsService
				.getAllEvents()
				.then(function(events){
					model.eventsList = events;
					if(events){
						for(var event in events){
							if(events[event].special){
								model.specialEvent = events[event];
								return;
							}
						}
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
					$route.reload();
				});
		}


	}
})();