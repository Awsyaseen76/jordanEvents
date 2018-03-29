(function() {
	angular
		.module('jordanEvents')
		.service('eventsService', eventsService);

	function eventsService() {

		var events = [{
			'eventId': '1',
			'name': 'football',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '2',
			'name': 'football jordan',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '3',
			'name': 'football junior',
			'category': 'sport',
			'subcategory': 'football',
			'makerId': '111',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '4',
			'name': 'tenis',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '5',
			'name': 'tenis for adults',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '6',
			'name': 'tenis for girls',
			'category': 'sport',
			'subcategory': 'tenis',
			'makerId': '222',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '7',
			'name': 'badminton',
			'category': 'sport',
			'subcategory': 'badminton',
			'makerId': '333',
			'details': 'deteils of the events written by the event maker'
		}, {
			'eventId': '8',
			'name': 'badminton for girls',
			'category': 'sport',
			'subcategory': 'badminton',
			'makerId': '333',
			'details': 'deteils of the events written by the event maker'
		}];

		function init() {
		}
		init();


		this.findEventsByMakerId = findEventsByMakerId;
		this.addNewEvent = addNewEvent;
		this.findEventByEventId = findEventByEventId;
		this.updateEvent = updateEvent;
		this.removeEvent = removeEvent;
		this.allEvents = events;


		function removeEvent(eventId){
			for(var e in events){
				if (events[e].eventId === eventId){
					events.splice(e,1);
					return events;
				}
			}
		}

		function updateEvent(newEvent, eventId){
			for(var e in events){
				if (events[e].eventId === eventId){
					events[e].name = newEvent.name;
					events[e].category = newEvent.category;
					events[e].subcategory = newEvent.subcategory;
					events[e].details = newEvent.details;
				}
			}
		}

		function findEventByEventId(eventId){
			for(var e in events){
				if (eventId === events[e].eventId){
					return events[e];
				}
			}
		}

		function findEventsByMakerId(makerId) {
			var eventsList = [];
			for(var e in events){
				if(makerId === events[e].makerId){
					eventsList.push(events[e]);
				}
			}
			return eventsList;
		}

		function addNewEvent(newEvent){
			newEvent.eventId = Date.now() + '';
			events.push(newEvent);
		}
	}
})();