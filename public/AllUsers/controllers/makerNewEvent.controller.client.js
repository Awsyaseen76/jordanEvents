(function(){
	angular
		.module('jordanEvents')
		.controller('makerNewEventController', makerNewEventController);

		function makerNewEventController($location, eventsService, loggedMaker, userService){
			var model = this;
			function init(){
				model.newEventMain = true;
				model.loggedMaker = loggedMaker;
				eventsService.findEventsByMakerId(loggedMaker._id)
				.then(function(events){
					model.eventsList = events;
				});
			}
			init();
			var _makerId = loggedMaker._id;
			
			model.createEvent = createEvent;
			model.logout = logout;
			model.createEventDetails = createEventDetails;

			function createEventDetails(newEvent, daysOfWeek){
				// create dates based on start-end dates and the days of the weeks
				var start = new Date(newEvent.startingDate);
				var end = new Date(newEvent.expiryDate);
				var days = [];
				var eventDays = [];
				for(var i in daysOfWeek){
					if(daysOfWeek[i] === true){	
						switch (i) {
						    case "Sun":
						        days.push(0);
						        break;
							case "Mon":
						        days.push(1);
						        break;
							case "Tue":
						        days.push(2);
						        break;
							case "Wed":
						        days.push(3);
						        break;
							case "Thu":
						        days.push(4);
						        break;
					        case "Fri":
					     	    days.push(5);
					     	    break;
							case "Sat":
						        days.push(6);
						        break;
						}
					}
				}
				newEvent.daysPerWeek = days;
				
				for (start; end>start; start.setDate(start.getDate()+1)){
					inner:
					for(var j in days){
						if(start.getDay() === days[j]){
							eventDays.push(start.toDateString());
							break inner;
						}
					}
				}
				// console.log(eventDays);
				newEvent.eventDays = eventDays;
				model.newEvent = newEvent;
				// console.log(model.newEvent);
				model.newEventMain = false;
				model.newEventProgramDetails = true;
				// console.log(newEvent);
			}

			
			function createEvent(newEvent){
				console.log(newEvent)
				newEvent.makerId = _makerId;
				eventsService.addNewEvent(newEvent)
					.then(function(addedEvent){
						console.log(addedEvent);
						$location.url('/makerProfile/eventsList');
					});
			}

			function logout(){
				userService
					.logout()
					.then(function(){
						$location.url('/');
					});
			}
			
			

		}
})();