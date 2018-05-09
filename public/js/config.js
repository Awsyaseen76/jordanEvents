(function() {
	angular
		.module('jordanEvents')
		.config(configuration);

	function configuration($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '../views/pages/home.html',
				controller: 'homePageController',
				controllerAs: 'model'
				// add a controller to use the logged user instead of $rootScope
			})
			.when('/allEvents', {
				templateUrl: 'events/templates/allEvents.view.client.html',
				controller: 'allEventsController',
				controllerAs: 'model'
			})
			.when('/allEvents/:eventId',{
				templateUrl: 'events/templates/eventDetails.view.client.html',
				controller: 'eventDetailsController',
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
			// .when('/userProfile/:userId', {       //remove the :userId
			.when('/userProfile', {
				templateUrl: 'users/templates/userProfile.view.client.html',
				controller: 'userProfileController',
				controllerAs: 'model',
				resolve: {
					loggedUser: checkUserLogin
				}
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
			.when('/makerProfile', {
				templateUrl: 'makers/templates/makerProfile.view.client.html',
				controller: 'makerProfileController',
				controllerAs: 'model',
				resolve: {
					loggedMaker: checkMakerLogin
				}
			})
			.when('/makerProfile/eventsList', {
				templateUrl: 'makers/templates/makerEventsList.view.client.html',
				controller: 'makerEventsListController',
				controllerAs: 'model',
				resolve: {
					loggedMaker: checkMakerLogin
				}
			})
			.when('/makerProfile/newEvent', {
				templateUrl: 'makers/templates/makerNewEvent.view.client.html',
				controller: 'makerNewEventController',
				controllerAs: 'model',
				resolve: {
					loggedMaker: checkMakerLogin
				}
			})
			.when('/makerProfile/editEvent', {
				templateUrl: 'makers/templates/makerEditEvent.view.client.html',
				controller: 'makerEditEventController',
				controllerAs: 'model',
				resolve: {
					loggedMaker: checkMakerLogin
				}
			})
			.when('/admin', {
				templateUrl: 'admin/templates/adminPage.view.client.html',
				controller: 'adminController',
				controllerAs: 'model',
				resolve: {
					loggedUser: checkUserLogin
				}
			})
			.when('/contact', {
				templateUrl: '../views/pages/contact.view.client.html',
				controller: 'homePageController',
				controllerAs: 'model'
			})
			.when('/about', {
				templateUrl: '../views/pages/about.view.client.html',
				controller: 'homePageController',
				controllerAs: 'model'
			});
	}
	
	// check the user if still logged in through the server cockies if the user logged in he is in the cockies based on that we can protect the url
	function checkUserLogin(userService, $q, $location){
		var deferred = $q.defer();
		userService
			.checkUserLogin()
			.then(function(user){
				if(user === '0'){
					deferred.reject();
					$location.url('/loginUser');
				} else{
					deferred.resolve(user);
				}
			});
		return deferred.promise;
	}


	// same for the makerfunction checkUserLogin(userService, $q, $location){
	function checkMakerLogin(makerService, $q, $location){
		var deferred = $q.defer();
		makerService
			.checkMakerLogin()
			.then(function(maker){
				if(maker === '0'){
					deferred.reject();
					$location.url('/loginMaker');
				} else{
					deferred.resolve(maker);
				}
			});
		return deferred.promise;
	}



})();