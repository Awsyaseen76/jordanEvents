(function() {
	angular
		.module('jordanEvents')
		.controller('adminController', adminController);

	function adminController(userService, eventsService, loggedAdmin, $location) {
		var model = this;

		function init() {
			model.loggedAdmin = loggedAdmin;
			model.adminPage = loggedAdmin;
			model.users = null;
			model.events = null;
		}
		init();

		model.logout = logout;
		model.getAllUsers = getAllUsers;
		model.getAllEvents = getAllEvents;

		function getAllUsers(){
			model.events = null;
			return userService
				.getAllUsers()
				.then(function (users){
					if(users){
						model.users = users.data;
						console.log(users.data);
					}
				});
		}

		function getAllEvents(){
			model.users = null;
			eventsService
					.getAllEvents()
					.then(function(events){
						if(events){
							model.events = events;	
						}
					});
		}



		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
				});
		}

	}
})();