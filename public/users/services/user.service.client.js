(function(){
	angular
		.module('jordanEvents')
		.service('userService', userService);

		function userService($http){
			
			function init(){
			}
			init();
			this.findUserByUsernameAndPassword = findUserByUsernameAndPassword;
			this.findUserByEmail = findUserByEmail;
			this.addNewUser = addNewUser;
			this.findUserbyId = findUserbyId;
			this.addEventToUserEventsList = addEventToUserEventsList;
			this.removeRegisteredEvent = removeRegisteredEvent;


			// var users = [
			// 				{'userId': '111', 'email': 'user1@email.com', 'password': '1', 'name': 'User 1', 'registeredEventsList': []},
			// 				{'userId': '222', 'email': 'user2@email.com', 'password': '2', 'name': 'User 2', 'registeredEventsList': []},
			// 				{'userId': '333', 'email': 'user3@email.com', 'password': '3', 'name': 'User 3', 'registeredEventsList': []},
			// 			];
			
			function removeRegisteredEvent(userId, eventId){
				var url = '/api/removeEventFromUser?userId='+userId+'&eventId='+eventId;
				return $http.delete(url);
				// for(var u in users){
				// 	if(userId === users[u].userId){
				// 		for(var r in users[u].registeredEventsList){
				// 			if(users[u].registeredEventsList[r].eventId === eventId){
				// 				users[u].registeredEventsList.splice(r,1);
				// 			}
				// 		}
				// 	}
				// }
			}

			function addEventToUserEventsList(event, userId){
				var url = '/api/addEventToUser/'+userId;
				return $http.post(url, event);
				// for(var u in users){
				// 	if(userId === users[u].userId){
				// 		users[u].registeredEventsList.push(event);
				// 		return;
				// 	}
				// }
			}

			function findUserByUsernameAndPassword(userName, password){ 
				var url = '/api/loginUser?username='+userName+'&password='+password;
				return $http.get(url);
				// for(var u in users){
				// 	if (user.email === users[u].email && user.password === users[u].password){
				// 		return users[u];
				// 	}
				// }
				// return null;
			}

			function findUserbyId(userId){
				var url = '/api/userProfile/'+userId;
				return $http.get(url);
				// for(var u in users){
				// 	if (userId === users[u].userId){
				// 		return users[u];
				// 	}
				// }
				// return null;
			}

			function findUserByEmail(userEmail){
				return $http.get('/api/checkUserEmail/'+userEmail);
				// for(var u in users){
				// 	if(user.email === users[u].email){
				// 		return users[u];
				// 	}
				// }
				// return null;
			}

			function addNewUser(user){

				// var userEmail = user.userEmail;
				// var checkUser = $http.get('/api/checkUserEmail/:userEmail');
				// if(checkUser === '0'){
					// var url = '/api/registerUser?userEmail='+user.email+'&password='+user.password+'&name='+user.name;
					return $http.post('/api/registerUser', user);
					

				// }
				// var checkUser = findUserByEmail(user);
				// if (checkUser === null){
				// 	user.userId = Date.now()+'';
				// 	users.push(user);
				// 	return user;
				// } else {
				// 	return null;
				// }
			}
		}
})();