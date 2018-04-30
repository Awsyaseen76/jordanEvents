(function() {
	angular
		.module('jordanEvents')
		.controller('loginMakerController', loginMakerController);

	function loginMakerController(makerService, $location, $rootScope) {

		var model = this;

		model.loginMaker = loginMaker;

		function init() {}
		init();

		$rootScope.logoutMaker = function (){
			makerService
					.logoutMaker()
					.then(function(response){
						$rootScope.loggedMaker = null;
						$location.url('/');
						
					});
		};

		function loginMaker(maker) {
			model.error = null;
			if (!maker) {
				model.error = 'Please fill the required fields';
				return;
			}
			makerService.loginMaker(maker.email, maker.password)
				.then(
					// if sccess
					function(matchedMaker){
						if (matchedMaker === '0') {
							model.error = 'Please check your email and password';
							return;
						} else {
							var makerId = matchedMaker._id;
							$rootScope.loggedMaker = matchedMaker;
							$location.url('/makerProfile/' + makerId);
						}	
					},
					// if error
					function(err){
						return err;
					}
				);
		}
	}
})();