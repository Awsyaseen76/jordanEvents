(function(){
	angular
		.module('jordanEvents')
		.service('userService', userService)

		function userService(){
			
			function init(){
			}
			init();
			this.matchUser = matchUser;
			this.findUserByEmail = findUserByEmail;
			this.addNewUser = addNewUser;
			this.findUserbyId = findUserbyId;
			this.addEventToUserEventsList = addEventToUserEventsList;
			this.removeRegisteredEvent = removeRegisteredEvent;


			var users = [
							{'userId': '111', 'email': 'user1@email.com', 'password': '1', 'name': 'User 1', 'registeredEventsList': []},
							{'userId': '222', 'email': 'user2@email.com', 'password': '2', 'name': 'User 2', 'registeredEventsList': []},
							{'userId': '333', 'email': 'user3@email.com', 'password': '3', 'name': 'User 3', 'registeredEventsList': []},
						];
			
			function removeRegisteredEvent(userId, eventId){
				for(var u in users){
					if(userId === users[u].userId){
						for(var r in users[u].registeredEventsList){
							if(users[u].registeredEventsList[r].eventId === eventId){
								users[u].registeredEventsList.splice(r,1);
							}
						}
					}
				}
			}

			function addEventToUserEventsList(event, userId){
				for(var u in users){
					if(userId === users[u].userId){
						users[u].registeredEventsList.push(event);
						return;
					}
				}
			}

			function matchUser(user){ 
				for(var u in users){
					if (user.email === users[u].email && user.password === users[u].password){
						return users[u];
					}
				}
				return null;
			}

			function findUserbyId(userId){
				for(var u in users){
					if (userId === users[u].userId){
						return users[u];
					}
				}
				return null;
			}

			function findUserByEmail(user){
				for(var u in users){
					if(user.email === users[u].email){
						return users[u];
					}
				}
				return null;
			}

			function addNewUser(user){
				var checkUser = findUserByEmail(user);
				if (checkUser === null){
					user.userId = Date.now()+''
					users.push(user);
					return user;
				} else {
					return null;
				}
			}
		}
})();