(function() {
	angular
		.module('jordanEvents')
		.service('eventsService', eventsService);

	function eventsService($http) {

		function init() {}
		init();


		this.getAllEvents = getAllEvents;
		this.findEventByEventId = findEventByEventId;
		this.findEventsByMakerId = findEventsByMakerId;
		this.addNewEvent = addNewEvent;
		this.updateEvent = updateEvent;
		this.removeEvent = removeEvent;
		this.updateEventByAdmin = updateEventByAdmin;

		function updateEventByAdmin(event){
			return $http.put('/api/admin/updateEventByAdmin/'+event._id, event)
				.then(function(response){
					return response.data;
				});
		}


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