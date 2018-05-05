(function() {
	angular
		.module('jordanEvents')
		.service('makerService', makerService);

	function makerService($http) {

		this.findMakerById = findMakerById;
		this.findMakerByEmail = findMakerByEmail;
		this.loginMaker = loginMaker;
		this.createMaker = createMaker;
		this.checkMakerLogin = checkMakerLogin;
		this.logoutMaker = logoutMaker;

		function init() {}
		init();


		function logoutMaker(){
			return $http
					.post('/api/logoutMaker')
					.then(function(response){
						console.log(response.data);
						return response.data;
					});
		}



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

		function loginMaker(username, password) {
			var url = '/api/maker/login';
			return $http.post(url, {username: username, password: password})
				.then(function(response) {
					if(response.data == '0'){
						return '0';
					}
						return response.data;
				},
				function(err){
					return err;
				});
		}

		

		function createMaker(maker){
			return $http.post('/api/maker/', maker)
				.then(function(response){
					return(response.data);
				});
		}




		function checkMakerLogin(){
			var url = '/api/checkMakerLogin';
			return $http
					.get(url)
					.then(function(result){
						return result.data;
					});
		}

	}
})();