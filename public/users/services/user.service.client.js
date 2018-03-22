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


			var users = [
							{'userId': '111', 'email': 'user1@email.com', 'password': '1', 'name': 'User 1'},
							{'userId': '222', 'email': 'user2@email.com', 'password': '2', 'name': 'User 2'},
							{'userId': '333', 'email': 'user3@email.com', 'password': '3', 'name': 'User 3'},
						];
			function matchUser(user){
				for(var u in users){
					if (user.email === users[u].email && usrt.password === musers[u].password){
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