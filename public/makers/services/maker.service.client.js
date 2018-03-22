(function(){
	angular
		.module('jordanEvents')
		.service('makerService', makerService)

		function makerService(){

			this.findMakerByEmail = findMakerByEmail;
			this.addNewMaker = addNewMaker;
			this.matchMaker = matchMaker;
			this.findMakerById = findMakerById;

			function init(){
			}
			init();

			function findMakerById(makerId){
				for (var m in makers){
					if (makerId === makers[m].makerId){
						return makers[m];
					}
				}
				return null;
			}

			function findMakerByEmail(maker){
				for(var m in makers){
					if (maker.email === makers[m].email){
						return makers[m];
					}
				}
				return null;
			}

			function matchMaker(maker){
				for(var m in makers){
					if (maker.email === makers[m].email && maker.password === makers[m].password){
						return makers[m];
					}
				}
				return null;
			}

			function addNewMaker(maker){
				var checkMaker = findMakerByEmail(maker);
					if (checkMaker === null){
						maker.makerId = Date.now()+''
						makers.push(maker);
						return maker;
					} else {
						return null;
					}				
			}

			var makers = [
						{'makerId': '111', 'email': 'maker1@email.com', 'password': '1', 'name': 'Maker 1'},
						{'makerId': '222', 'email': 'maker2@email.com', 'password': '2', 'name': 'Maker 2'},
						{'makerId': '333', 'email': 'maker3@email.com', 'password': '3', 'name': 'Maker 3'}
						]
	
		}
})();