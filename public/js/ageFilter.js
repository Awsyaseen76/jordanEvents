// custom filter to use it filter the events by the age entered on the all events page
angular
	.module('jordanEvents')
	.filter('ageFilter', function(){
		return function(events, age){
			if(age){
				events = events.filter(function(event){
					return (event.ageGroup.ageFrom <= age && event.ageGroup.ageTo >= age);
				});
				return events;
			}else{
				return events;
			}
		};
	});