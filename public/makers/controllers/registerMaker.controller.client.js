(function() {
	angular
		.module('jordanEvents')
		.controller('makerRegisterController', makerRegisterController);

	function makerRegisterController(makerService, $location, $rootScope) {
		var model = this;

		function init() {}
		init();
		model.registerMaker = registerMaker;


		function registerMaker(maker, password2) {
			console.log(maker);
			console.log(password2);
			if (!maker) {
				model.error = 'Please fill all the requested fields';
				return;
			}
			if (maker.password === password2) {
				model.error = null;

				return makerService.findMakerByEmail(maker)
					.then(function(response){
						var matchedMaker = response.data;
						console.log(matchedMaker);
						var makerId = matchedMaker.makerId;
						$rootScope.loggedMaker = matchedMaker;
						$location.url('/makerProfile/' + makerId);
					});

				// var newMaker;
				// makerService.findMakerByEmail(maker)
				// 	.then(function(matchedMaker){
				// 		console.log(matchedMaker);
						// if(matchedMaker === 'its ok'){
						// 	return makerService.addNewMaker(maker)
						// 		.then(function(response){
						// 			$rootScope.loggedMaker = response.data;
						// 			$location.url('/makerProfile/' + response.data.makerId);
						// 			// return response.data;
						// 		});
						// }
						// console.log(response);
						// return response.data;
					// });
				
				// if (newMaker === null) {
				// 	model.error = 'This email is already registered';
				// } else {
				// 	$rootScope.loggedMaker = newMaker;
				// 	$location.url('/makerProfile/' + newMaker.makerId);
				// }
			} else {
				model.error = 'Please double check that the two passwords are matched';
			}
		}
	}
})();