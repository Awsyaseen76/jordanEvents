(function(){
	angular
		.module('jordanEvents')
		.config(configuration);

	function configuration($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'pages/home.html'
			})
			.when('/allEvents', {
				templateUrl: 'users/templates/allEvents.view.client.html',
				controller: 'allEventsController',
				controllerAs: 'model'
			})
			.when('/loginUser', {
				templateUrl: 'users/templates/loginUser.view.client.html',
				controller: 'loginUserController',
				controllerAs: 'model'
			})
			.when('/registerUser', {
				templateUrl: 'users/templates/registerUser.view.client.html',
				controller: 'registerUserController',
				controllerAs: 'model'
			})
			.when('/userProfile/:userId', {
				templateUrl: 'users/templates/userProfile.view.client.html',
				controller: 'userProfileController',
				controllerAs: 'model'
			})
			.when('/loginMaker', {
				templateUrl: 'makers/templates/loginMaker.view.client.html',
				controller: 'loginMakerController',
				controllerAs: 'model'
			})
			.when('/registerMaker', {
				templateUrl: 'makers/templates/registerMaker.view.cliet.html',
				controller: 'makerRegisterController',
				controllerAs: 'model'
			})
			.when('/makerProfile/:makerId', {
				templateUrl: 'makers/templates/makerProfile.view.client.html',
				controller: 'makerProfileController',
				controllerAs: 'model'
			})
	}
})();