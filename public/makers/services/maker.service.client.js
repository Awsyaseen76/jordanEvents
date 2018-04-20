(function() {
	angular
		.module('jordanEvents')
		.service('makerService', makerService);

	function makerService($http) {

		this.findMakerById = findMakerById;
		this.findMakerByEmail = findMakerByEmail;
		this.loginMaker = loginMaker;
		this.createMaker = createMaker;

		function init() {}
		init();

		function findMakerById(makerId) {
			var url = '/api/maker/?makerId=' + makerId;
			return $http.get(url)
				.then(function(response) {
					var makerProfile = response.data;
					return makerProfile;
				});
		}

		function findMakerByEmail(maker) {
			var url = '/api/maker/' + maker.email;
			return $http.get(url)
				.then(function(response) {
					var result = response.data;
					if(result.email){
						return ('email already exist');
					} else{
						return ('ready');
					}
				});
		}

		function loginMaker(maker) {
			var email = maker.email;
			var password = maker.password;
			// var url = '/api/maker?email=' + email + '&password=' + password;
			var url = '/api/maker/login/?email=' + email + '&password=' + password;
			return $http.get(url)
				.then(function(response) {
					if(response.data){
						var matchedMaker = response.data;
						return matchedMaker;
					} else{
						return ('error');
					}
				});
		}

		

		function createMaker(maker){
			return $http.post('/api/maker/', maker)
				.then(function(response){
					return(response.data);
				});
		}

	}
})();