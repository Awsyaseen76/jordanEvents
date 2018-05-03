(function() {
	angular
		.module('jordanEvents')
		.controller('makerProfileController', makerProfileController);

	function makerProfileController($routeParams, makerService, userService, loggedMaker) {
		var model = this;

		function init() {
			var _makerId = loggedMaker._id;
			makerService.findMakerById(_makerId)
				.then(function (makerProfile){
					model.makerProfile = makerProfile;
					if (model.makerProfile === 'error') {
						model.error = 'Please login with your email and password';
						return;
					} else {
						return model.makerProfile;
					}
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

	}
})();