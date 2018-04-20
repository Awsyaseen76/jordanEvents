(function() {
	angular
		.module('jordanEvents')
		.controller('makerProfileController', makerProfileController);

	function makerProfileController($routeParams, makerService) {
		var model = this;

		function init() {
			var _makerId = $routeParams.makerId;
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
		}
		init();

	}
})();