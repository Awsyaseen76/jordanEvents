(function(){
	angular
		.module('jordanEvents')
		.controller('makerEventDetails', makerEventDetails);

		function makerEventDetails($routeParams, eventsService, userService, $location, $route, loggedMaker){
			
			var model = this;
			model.logout = logout;
			model.makePayment = makePayment;
			model.getTotals = getTotals;
			model.confirmAttendance = confirmAttendance;
			model.today = new Date();
			model.attendanceArray = [];
			model.countAttendance = countAttendance;


			function init(){
				model.loggedMaker = loggedMaker;
				model.error2 = null;
				model.grandTotalPayments = 0;
				var eventId = $routeParams.eventId;
				
				eventsService
					.findEventByEventId(eventId)
					.then(function(eventDetails){
						model.eventDetails = eventDetails;
						for(var x in eventDetails.registeredMembers){
							for(var j in eventDetails.registeredMembers[x].payments){
								if(eventDetails.registeredMembers[x].payments[j].eventId === eventDetails._id){
									model.grandTotalPayments+= JSON.parse(eventDetails.registeredMembers[x].payments[j].paymentAmount);
								}
							}
						}
					});

				// check if there any user has already logged in to use it instead of the $rootScope
				// userService
				// 	.checkUserLogin()
				// 	.then(function(user){
				// 		if(user){
				// 			model.loggedUser = user;
				// 		}
				// 	});
				
			}
			init();

			


			function countAttendance(attendees){
				// console.log(attendees);
				model.attendedM = 0;
				model.attendanceArray = [];
				
				for(var m in model.eventDetails.registeredMembers){
					model.attendanceArray.push({
						eventId: model.eventDetails._id,
						userId: model.eventDetails.registeredMembers[m]._id,
						date: new Date().toDateString(),
						attended: false
					})
				}


				for(var n in model.attendanceArray){
					for(var x in Object.keys(attendees)){
						if(Object.keys(attendees)[x] === model.attendanceArray[n].userId){
							model.attendanceArray[n].attended = attendees[Object.keys(attendees)[x]];
							Object.keys(attendees).splice(x, 1);
						}
					}
				}


				// console.log(model.attendanceArray);
				for(var j in model.attendanceArray){
					if(model.attendanceArray[j].attended === true){
						// console.log('model.attendedM')
						model.attendedM+=1;
					}
				}
				console.log(model.attendanceArray);
			}
			// this one is working
			// function confirmAttendance(totalAttended){
			// 	// make a default false attendance for all mambers
			// 	for(var m in model.eventDetails.registeredMembers){
			// 		model.eventDetails.registeredMembers[m].attendedEvents.push({
			// 			eventId: model.eventDetails._id,
			// 			[model.today.toDateString()]: false 
			// 		})
			// 	}

			// 	outer:
			// 	for(var j in model.eventDetails.registeredMembers){
			// 		inner:
			// 		for(var i in totalAttended){
			// 			if(model.eventDetails.registeredMembers[j]._id === totalAttended[i].userId){
			// 				// loop on the registered events of a member
			// 				for(var r in model.eventDetails.registeredMembers[j].attendedEvents){
			// 					if(model.eventDetails.registeredMembers[j].attendedEvents[r].eventId === model.eventDetails._id && Object.keys(model.eventDetails.registeredMembers[j].attendedEvents[r])[1] === model.today.toDateString()){
			// 						model.eventDetails.registeredMembers[j].attendedEvents[r][model.today.toDateString()] = totalAttended[i].attended;
			// 						// totalAttended[i].splice(i, 1);
			// 						break inner;
			// 					}
			// 				}
			// 			} 
			// 		}
			// 	}
			// 	console.log(model.eventDetails.registeredMembers);
			// }

			// make it on the database
			function confirmAttendance(totalAttended){
				userService
					.confirmAttendance(totalAttended)
					.then(function(result){
						console.log(result.data);
					})
			}


			function getTotals(user, eventId){
				var totalOfPayments = 0;
				for(var x in user.payments){
					if(user.payments[x].eventId === eventId){
						totalOfPayments+= JSON.parse(user.payments[x].paymentAmount);
					}
				}
				return {eventId:{total: totalOfPayments, balance: totalOfPayments-model.eventDetails.price}}
			}

			function makePayment(userId, eventId, payment){
				payment.eventId = eventId;
				payment.userId = userId;
				// console.log(eventId);
				// console.log(payment);
				userService
					.makePayment(payment)
					.then(function(result){
						// console.log(result.data);
					})
				$route.reload()
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

