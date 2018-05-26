(function(){
	angular
		.module('jordanEvents')
		.controller('homePageController', homePageController);

	function homePageController(userService, $location, eventsService, $route){
		var model = this;
		function init(){
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

			// eventsService
			// 	.findEventByEventId('5afd5cef4fc8ca045730b164')
			// 	.then(function(foundedEvent){
			// 		model.specialEvent = foundedEvent;
			// 	});
		}
		init();

		model.logout = logout;
		model.sendmail = sendmail;

		function sendmail(){
			userService
				.testMail()
				.then(function(){
					console.log('Mail Sent..........');
				});
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