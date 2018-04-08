(function() {
	angular
		.module('jordanEvents')
		.service('makerService', makerService);

	function makerService($http) {

		this.findMakerByEmail = findMakerByEmail;
		this.matchMaker = matchMaker;
		this.findMakerById = findMakerById;

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
			var url = '/api/maker/makerEmail=' + maker.email;
			return $http.get(url)
				.then(function(response) {
					var result = response.data;
					if(result === 'email already exist'){
						return ('email already exist');
					} else{
						return $http.post('/api/maker/', maker);
					}
				});
		}

		function matchMaker(maker) {
			var email = maker.email;
			var password = maker.password;
			var url = '/api/maker?email=' + email + '&password=' + password;
			return $http.get(url)
				.then(function(response) {
					var matchedMaker = response.data;
					return matchedMaker;
				});
		}

	}
})();