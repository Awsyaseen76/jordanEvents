(function(){
	angular
		.module('jordanEvents')
		.controller('loginUserController', loginUserController);

		function loginUserController($location, userService, makerService, $rootScope){
			var model = this;

			model.loginSubmit = loginSubmit;

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
							// $rootScope.loggedUser = foundUser;
							// $location.url('/userProfile/'+foundUser._id); // remove the user ID
							$location.url('/userProfile');
							return //foundUser;
						}	
					}, 
					function(err){
						return err;
					});
			}
		}
})();