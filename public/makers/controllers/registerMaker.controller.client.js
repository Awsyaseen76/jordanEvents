(function() {
	angular
		.module('jordanEvents')
		.controller('makerRegisterController', makerRegisterController);

	function makerRegisterController(makerService, $location, $rootScope) {
		var model = this;

		function init() {}
		init();
		model.registerMaker = registerMaker;

		function registerMaker(maker, password2) {
			if (!maker) {
				model.error = 'Please fill all the requested fields';
				return;
			}
			if (maker.password === password2) {
				model.error = null;
				var newMaker = makerService.addNewMaker(maker);
				if (newMaker === null) {
					model.error = 'This email is already registered';
				} else {
					$rootScope.loggedMaker = newMaker;
					$location.url('/makerProfile/' + newMaker.makerId);
				}
			} else {
				model.error = 'Please double check that the two passwords are matched';
			}
		}
	}
})();