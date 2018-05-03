(function() {
	angular
		.module('jordanEvents')
		.controller('loginMakerController', loginMakerController);

	function loginMakerController(makerService, userService, $location, $rootScope) {

		var model = this;

		model.loginMaker = loginMaker;

		function init() {
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
							$location.url('/makerProfile');
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