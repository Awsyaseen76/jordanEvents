(function() {
	angular
		.module('jordanEvents')
		.controller('adminController', adminController);

	function adminController($routeParams, makerService, userService, $location) {
		var model = this;

		function init() {
			// var _makerId = loggedMaker._id;
			userService
				.checkUserLogin()
				.then(function(result){
					if(result){
						userService
							.getAllUsers()
							.then(function(users){
								model.users = users;
								$location.url('/admin');
								return;
							}, 
							function(err){
								return err;
							});
						return result;
					}
				},
				function(err){
					return err;
				});


			// makerService
			// 	.findMakerById(_makerId)
			// 	.then(function (makerProfile){
			// 		model.makerProfile = makerProfile;
			// 		if (model.makerProfile === 'error') {
			// 			model.error = 'Please login with your email and password';
			// 			return;
			// 		} else {
			// 			return model.makerProfile;
			// 		}
			// 	});
			

			// makerService
			// 		.checkMakerLogin()
			// 		.then(function(result){
			// 			if(result){
			// 				model.loggedMaker = result;
			// 			}
			// 		});
		}
		init();

	}
})();