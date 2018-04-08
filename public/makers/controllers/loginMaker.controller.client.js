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
			$rootScope.loggedMaker = null;
			$location.url('/home');
		};

		function loginMaker(maker) {
			model.error = null;
			if (!maker) {
				model.error = 'Please fill the required fields';
				return;
			}
			makerService.matchMaker(maker)
				.then(function(matchedMaker){
					if (matchedMaker === 'error') {
						model.error = 'Please check your email and password';
						return;
					} else {
						var makerId = matchedMaker.makerId;
						$rootScope.loggedMaker = matchedMaker;
						$location.url('/makerProfile/' + makerId);
					}	
				});
		}
	}
})();