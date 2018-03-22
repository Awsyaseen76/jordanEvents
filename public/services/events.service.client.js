(function(){
	angular
		.module('jordanEvents')
		.service('makerService')

		function makerService(){
			var model = this;
			function init(){

			}
			init();

			var users = [
						{'userId': '111', 'userName': 'user1', 'password': '1', 'name': 'User 1'},
						{'userId': '222', 'userName': 'user2', 'password': '2', 'name': 'User 2'},
						{'userId': '333', 'userName': 'user3', 'password': '3', 'name': 'User 3'},
						]

			var makers = [
						{'userId': '111', 'userName': 'maker1', 'password': '1', 'name': 'Maker 1'},
						{'userId': '222', 'userName': 'maker2', 'password': '2', 'name': 'Maker 2'},
						{'userId': '333', 'userName': 'maker3', 'password': '3', 'name': 'Maker 3'},
						]

			var events = [
							{'name': 'football', 'category': 'sport', 'subcategory': 'football', 'maker': 'maker1'}
							{'name': 'football jordan', 'category': 'sport', 'subcategory': 'football', 'maker': 'maker1'}
							{'name': 'football junior', 'category': 'sport', 'subcategory': 'football', 'maker': 'maker1'}
							{'name': 'tenis', 'category': 'sport', 'subcategory': 'tenis', 'maker': 'maker3'}
							{'name': 'tenis for adults', 'category': 'sport', 'subcategory': 'tenis', 'maker': 'maker3'}
							{'name': 'tenis for girls', 'category': 'sport', 'subcategory': 'tenis', 'maker': 'maker3'}
							{'name': 'badminton', 'category': 'sport', 'subcategory': 'badminton', 'maker': 'maker2'}
							{'name': 'badminton for girls', 'category': 'sport', 'subcategory': 'badminton', 'maker': 'maker2'}
						]	
		}
})();

