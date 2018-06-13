(function() {
	angular
		.module('jordanEvents')
		.controller('updateUserProfile', updateUserProfile);

	function updateUserProfile(userService, loggedUser, $location) {
		var model = this;

		function init() {
			model.userProfile = loggedUser;
			model.loggedUser = loggedUser;
		}
		init();

		model.logout = logout;
		model.removeRegisteredEvent = removeRegisteredEvent;
		model.updateProfile = updateProfile;

		function updateProfile(updatedUserProfile){
			userService
				.updateProfile(updatedUserProfile)
				.then(function(result){
					console.log(result.data);
					console.log('Profile Updated');
				})
		}

		function ValidateSize(file) {
	        		var FileSize = file.files[0].size / 1024 / 1024; // in MB
	        		if (FileSize > 2) {
	            		alert('File size exceeds 2 MB');
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