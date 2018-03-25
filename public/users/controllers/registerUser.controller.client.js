(function(){
	angular
		.module('jordanEvents')
		.controller('registerUserController', registerUserController)

		function registerUserController(userService, $location, $rootScope){
			var model = this;

			function init(){
			}
			init();	
			model.registerSubmit = registerSubmit;

			function registerSubmit(user, password2){
				if (!user){
					model.error = 'Please fill all the requested fields';
					return;
				}
				if (user.password === password2){
					model.error = null;
					var newUser = userService.addNewUser(user)
					if (newUser === null){
						model.error = 'This email is already registered'
					} else {
						$rootScope.loggedUser = newUser;
						$location.url('/userProfile/'+newUser.userId)
					}
				} else {
					model.error = 'Please double check that the two passwords are matched';
				}
			}
		}
})();