(function() {
	angular
		.module('jordanEvents')
		.controller('makerProfileController', makerProfileController);

	function makerProfileController($routeParams, makerService, eventsService) {
		var model = this;

		function init() {
			var _makerId = $routeParams.makerId;
			model.makerProfile = makerService.findMakerById(_makerId);
			if (model.makerProfile === null) {
				model.error = 'Please login with your email and password';
				return;
			} else {
				return model.makerProfile;
			}
		}
		init();



	}
})();