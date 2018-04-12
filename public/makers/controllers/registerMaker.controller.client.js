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
			console.log(maker);
			console.log(password2);
			if (!maker) {
				model.error = 'Please fill all the requested fields';
				return;
			}
			if (maker.password === password2) {
				model.error = null;

				return makerService.findMakerByEmail(maker)
					.then(function(response){
						var matchedMaker = response.data;
						console.log(matchedMaker);
						var makerId = matchedMaker.makerId;
						$rootScope.loggedMaker = matchedMaker;
						$location.url('/makerProfile/' + makerId);
					});


			} else {
				model.error = 'Please double check that the two passwords are matched';
			}
		}
	}
})();