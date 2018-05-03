(function(){
	angular
		.module('jordanEvents')
		.controller('homePageController', homePageController);

	function homePageController(userService, makerService){
		var model = this;

		function init(){
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

	}
})();