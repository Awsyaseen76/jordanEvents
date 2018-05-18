(function() {
	angular
		.module('jordanEvents')
		.controller('loginController', loginController);

	function loginController(userService, $location) {

		var model = this;

		model.login = login;
		model.logout = logout;
		function init() {
			userService
					.checkUserLogin()
					.then(function(result){
						if(result){
							model.loggedUser = result;
						}
					});
		}
		init();


		function login(user) {
			model.error = null;
			if (!user) {
				model.error = 'Please fill the required fields';
				return;
			}
			userService
				.login(user.email, user.password)
				.then(
					// if sccess
					function(matchedUser){
						console.log(matchedUser);
						if(matchedUser.data === "Bad Request"){
							model.error = 'Please double check the email field';
							return;
						}else if (matchedUser.data === "Unauthorized") {
							model.error = 'Please check your email and password';
							return;
						} else {
							$location.url('/profile');
							return;
						}
							////////////

					},
					// if error
					function(err){
						return err;
					}
				);
		}

		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
				});
		}
	}
})();