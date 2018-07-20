(function(){
	angular
		.module('jordanEvents')
		.controller('homePageController', homePageController);

	function homePageController(userService, $location, eventsService, $route){
		var model = this;

		// model.eventsPlaces = [];
		// var eventsParams = [];

		function init(){
			getLocation();
			

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

			function getLocation() {
				console.log('im here')
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(showPosition);
			    } else { 
			        console.log("Geolocation is not supported by this browser.");
			    }
			};	

			function showPosition(position){
				model.position.latitude = position.coords.latitude; 
				model.position.longitude = position.coords.longitude;
			}
			
			// This make the carousel works and set the sliding time
			$(document).ready(function() {
	          $('.carousel').carousel({
	            interval: 3000
	          })
	        });
		}

		init();

		model.position = {}

		model.logout = logout;
		model.getPosition = getPosition;

		function getPosition(){
			model.position.lng = model.position.longitude;
			model.position.lat = model.position.longitude;
		}

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