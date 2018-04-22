(function() {
	angular
		.module('jordanEvents')
		.service('eventsService', eventsService);

	function eventsService($http) {

		// var events = [{
		// 	'eventId': '1',
		// 	'name': 'football',
		// 	'category': 'sport',
		// 	'subcategory': 'football',
		// 	'makerId': '111',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '2',
		// 	'name': 'football jordan',
		// 	'category': 'sport',
		// 	'subcategory': 'football',
		// 	'makerId': '111',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '3',
		// 	'name': 'football junior',
		// 	'category': 'sport',
		// 	'subcategory': 'football',
		// 	'makerId': '111',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '4',
		// 	'name': 'tenis',
		// 	'category': 'sport',
		// 	'subcategory': 'tenis',
		// 	'makerId': '222',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '5',
		// 	'name': 'tenis for adults',
		// 	'category': 'sport',
		// 	'subcategory': 'tenis',
		// 	'makerId': '222',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '6',
		// 	'name': 'tenis for girls',
		// 	'category': 'sport',
		// 	'subcategory': 'tenis',
		// 	'makerId': '222',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '7',
		// 	'name': 'badminton',
		// 	'category': 'sport',
		// 	'subcategory': 'badminton',
		// 	'makerId': '333',
		// 	'details': 'deteils of the events written by the event maker'
		// }, {
		// 	'eventId': '8',
		// 	'name': 'badminton for girls',
		// 	'category': 'sport',
		// 	'subcategory': 'badminton',
		// 	'makerId': '333',
		// 	'details': 'deteils of the events written by the event maker'
		// }];

		function init() {}
		init();


		this.getAllEvents = getAllEvents;
		this.findEventByEventId = findEventByEventId;
		this.findEventsByMakerId = findEventsByMakerId;
		this.addNewEvent = addNewEvent;
		this.updateEvent = updateEvent;
		this.removeEvent = removeEvent;


		function getAllEvents(){
			return $http.get('/api/allEvents')
				.then(function(response){
					return response.data;
				});
		}

		function findEventByEventId(eventId){
			return $http.get('/api/event/' + eventId)
				.then(function(response){
					return response.data;
				});
		}

		function findEventsByMakerId(makerId) {
			return $http.get('/api/makerEvents/' + makerId)
				.then(function(response){
					return response.data;
				});
		}

		function addNewEvent(newEvent){
			//newEvent.eventId = Date.now() + '';
			return $http.post('/api/event/', newEvent)
				.then(function(response){
					return response.data;
				});
			// events.push(newEvent);
		}

		function updateEvent(updatedEvent, eventId){
			// var url = '/api/event/' + eventId;
			return $http.put('/api/event/?eventId='+eventId, updatedEvent)
				.then(function (response){
					return response.data;					
				});			
			// for(var e in events){
			// 	if (events[e].eventId === eventId){
			// 		events[e].name = newEvent.name;
			// 		events[e].category = newEvent.category;
			// 		events[e].subcategory = newEvent.subcategory;
			// 		events[e].details = newEvent.details;
			// 	}
			// }
		}


		function removeEvent(makerId, eventId){
			var url = '/api/event/?eventId=' + eventId + '&makerId='+makerId;
			return $http.delete(url)
				.then(function(response){
					return response.data;
				});
			// for(var e in events){
			// 	if (events[e].eventId === eventId){
			// 		events.splice(e,1);
			// 		return events;
			// 	}
			// }
		}




	}
})();