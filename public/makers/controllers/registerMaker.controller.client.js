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

				return makerService.findMakerByEmail(maker)
					.then(function(result){
						if(result === 'email already exist'){
							model.error = 'email already exist';
							return;
						} else{
							return makerService.createMaker(maker)
								.then(function(result){
									var matchedMaker = result;
									var makerId = matchedMaker._id;
									$rootScope.loggedMaker = matchedMaker;
									$location.url('/makerProfile/' + makerId);
									return;
								});
						}
					});


			} else {
				model.error = 'Please double check that the two passwords are matched';
			}
		}
	}
})();