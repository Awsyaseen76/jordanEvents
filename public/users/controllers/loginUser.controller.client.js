(function(){
	angular
		.module('jordanEvents')
		.controller('loginUserController', loginUserController);

		function loginUserController($location, userService, $rootScope){
			var model = this;

			model.loginSubmit = loginSubmit;

			function init(){
			}
			init();

			$rootScope.logoutUser = function (){
				userService
					.logoutUser()
					.then(function(ersponse){
						$rootScope.loggedUser = null;
						$location.url('/');
					});
			};

			function loginSubmit(user){
				if (!user){
					model.error = 'Please check your eamil and password';
					return;
				}
				userService
					.loginUser(user.email, user.password)
					.then(function(foundUser){
						model.error = null;
						if (foundUser === '0'){
							model.error = 'Please check your eamil and password';
							return;
						} else {
							$rootScope.loggedUser = foundUser;
							$location.url('/userProfile/'+foundUser._id);
							return foundUser;
						}	
					}, 
					function(err){
						return err;
					});
			}
		}
})();