(function() {
	angular
		.module('jordanEvents')
		.controller('userProfileController', userProfileController);

	function userProfileController(userService, loggedUser, $location) {
		var model = this;

		function init() {
			model.userProfile = loggedUser;
			model.loggedUser = loggedUser;
			// var _userId = loggedUser._id;
			// userService.findUserById(_userId)
			// 	.then(function (userProfile){
			// 		model.userProfile = userProfile;
			// 		if (model.userProfile === 'error') {
			// 			model.error = 'Please login with your email and password';
			// 			return;
			// 		} else {
			// 			return model.userProfile;
			// 		}
			// 	});
			// userService
			// 		.checkUserLogin()
			// 		.then(function(result){
			// 			if(result){
			// 				model.loggedUser = result;
			// 			}
			// 		});
		}
		init();

		model.logout = logout;
		model.removeRegisteredEvent = removeRegisteredEvent;
	



		function ValidateSize(file) {
	        		var FileSize = file.files[0].size / 1024 / 1024; // in MB
	        		if (FileSize > 2) {
	            		alert('File size exceeds 2 MB');
	           // $(file).val(''); //for clearing with Jquery
	        		} else {
	        			alert(file.files[0].size);
	        		}
    			}




		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
				});
		}



		function removeRegisteredEvent(eventId){
			// var _userId = $routeParams.userId;
			userService
				.removeRegisteredEvent(loggedUser._id, eventId)
				.then(function(response){
					$location.url('/profile');
				});
		}

	}
})();