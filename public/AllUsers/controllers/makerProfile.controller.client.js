(function() {
	angular
		.module('jordanEvents')
		.controller('makerProfileController', makerProfileController);

	function makerProfileController(userService, loggedMaker, $location) {
		var model = this;

		function init() {
			model.loggedMaker = loggedMaker;
			model.makerProfile = loggedMaker;
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