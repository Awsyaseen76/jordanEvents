(function(){
	angular
		.module('jordanEvents')
		.controller('loginMakerController', loginMakerController);

	function loginMakerController(makerService, $location){

		var model = this;

		model.loginMaker = loginMaker;

		function init(){
		}
		init();

		function loginMaker(maker){
			model.error = null;
			if (!maker){
				model.error = 'Please fill the required fiels'
				return;
			}
			var matchMaker = makerService.matchMaker(maker)
			if (matchMaker === null){
				model.error = 'Please check your email and password';
			}
			$location.url('/makerProfile/'+matchMaker.makerId)
		}
	}
})();