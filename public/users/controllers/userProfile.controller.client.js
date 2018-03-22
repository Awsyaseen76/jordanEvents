(function(){
	angular
		.module('jordanEvents')
		.controller('userProfileController', userProfileController)

		function userProfileController(userService, $routeParams){
			var model = this;
			function init(){
				model.hello = 'hi from the userProfileController'
				var _userId = $routeParams['userId'];
				model.userProfile = userService.findUserbyId(_userId);
				console.log('userProfile')
				console.log(model.userProfile)
				if (model.userProfile === null){
					model.error = 'Please login to view your profile details'
					return;
				} else {
					model.error=null;
					return model.userProfile;
				}
			}
			init();
		}
})();