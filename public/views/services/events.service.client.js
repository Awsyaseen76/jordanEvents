(function() {
	angular
		.module('jordanEvents')
		.service('eventsService', eventsService);

	function eventsService() {

		function init() {}
		init();


		this.findEventsByMakerId = findEventsByMakerId;

		function findEventsByMakerId(makerId) {
			var eventsList = [];
			for(var e in events){
				if(makerId === events[e].makerId){
					eventsList.push(events[e]);
				}
			}
			return eventsList;
		}


		var events = [{
			'name': 'football',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111'
		}, {
			'name': 'football jordan',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111'
		}, {
			'name': 'football junior',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111'
		}, {
			'name': 'tenis',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222'
		}, {
			'name': 'tenis for adults',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222'
		}, {
			'name': 'tenis for girls',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222'
		}, {
			'name': 'badminton',
			'category': 'sport',
			'subcategory': 'badminton',
			'makerId': '333'
		}, {
			'name': 'badminton for girls',
			'category': 'sport',
			'subcategory': 'badminton',
			'makerId': '333'
		}];
	}
})();