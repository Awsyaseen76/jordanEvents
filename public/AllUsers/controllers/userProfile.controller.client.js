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
		model.totalPayments = totalPayments;
		model.attendedDays = attendedDays;

		function attendedDays(eventId){
			var attended = 0;
			var missed = 0;
			for(var i in loggedUser.attendedEvents){
				if(eventId === loggedUser.attendedEvents[i].eventId && loggedUser.attendedEvents[i].attended===true){
					attended+=1;
				} else if(eventId === loggedUser.attendedEvents[i].eventId && loggedUser.attendedEvents[i].attended===false){
					missed+=1;
				}
			}
			return {attended: attended, missed: missed};
		}
	


		function totalPayments(eventId, eventPrice){
			var totals = 0;
			var balance = 0;
			for(var i in loggedUser.payments){
				console.log(eventId , loggedUser.payments[i].eventId);
				if(eventId === loggedUser.payments[i].eventId){
					totals+= JSON.parse(loggedUser.payments[i].paymentAmount)
				}
			}
			balance = totals - eventPrice
			return {totals: totals, balance: balance};
		}

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