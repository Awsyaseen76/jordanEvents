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
				model.error = 'Please fill the required fiels';
				return;
			}
			var matchMaker = makerService.matchMaker(maker);
			if (matchMaker === null) {
				model.error = 'Please check your email and password';
				return;
			}
			var makerId = matchMaker.makerId;
			$rootScope.loggedMaker = matchMaker;
			$location.url('/makerProfile/' + makerId);
		}
	}
})();