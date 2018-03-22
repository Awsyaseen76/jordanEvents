(function(){
	angular
		.module('jordanEvents')
		.controller('loginUserController', loginUserController)

		function loginUserController($location, userService){
			var model = this;

			model.loginSubmit = loginSubmit;

			function init(){
			}
			init();

			function loginSubmit(user){
				if (!user){
					model.error = 'Please check your eamil and password'
					return
				}
				var foundUser = userService.matchUser(user);
				model.error = null;
				if (foundUser === null){
					model.error = 'Please check your eamil and password';
					return 
				} else {
					console.log(foundUser)
					$location.url('/userProfile/'+foundUser.userId);
					return foundUser;
				}
			}
		}
})();