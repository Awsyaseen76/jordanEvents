(function(){
	angular
		.module('jordanEvents')
		.controller('makerEventDetails', makerEventDetails);

		function makerEventDetails($routeParams, eventsService, userService, $location){
			var model = this;


			function init(){
				model.error2 = null;
				model.temp = [];
				model.balances = [];
				var eventId = $routeParams.eventId;
				// var eventDetails = eventsService.findEventByEventId(eventId);
				eventsService
					.findEventByEventId(eventId)
					.then(function(eventDetails){
						model.eventDetails = eventDetails;
						for(var i in eventDetails.registeredMembers){
							for(var j in eventDetails.registeredMembers[i].payments){
								model.temp.push({
									eventId: eventDetails.registeredMembers[i].payments[j].eventId,
									totalPayment: JSON.parse(eventDetails.registeredMembers[i].payments[j].paymentAmount)
								})	
								// for(var x in model.balances){
								// 	if(model.balances[x].eventId === eventDetails.registeredMembers[i].payments[j].eventId){
								// 		model.balances[x].totalPayment += eventDetails.registeredMembers[i].payments[j].paymentAmount;
								// 	}else{
								// 		model.balances.push({
								// 		eventId: eventDetails.registeredMembers[i].payments[j].eventId,
								// 		totalPayment: eventDetails.registeredMembers[i].payments[j].paymentAmount
								// 	})	
								// 	}
								// }	
									// model.balances.push({
									// 	eventId: eventDetails.registeredMembers[i].payments[j].eventId,
									// 	totalPayment: eventDetails.registeredMembers[i].payments[j].paymentAmount
									// })
									// console.log(eventDetails.registeredMembers[i].payments[j].paymentAmount)
							}
						}
						
						console.log(model.temp);
						for(var x in model.temp){
							if(model.balances.length === 0){
									model.balances.push(model.temp[x]);	
							} else{
								for(var n in model.balances){
									console.log(model.balances[n]);
									if(model.temp[x].eventId === model.balances[n].eventId){
										model.balances[n].totalPayment += model.temp[x].totalPayment;	
									} else {
										model.balances.push(model.temp[x])
									}
								}	
							}
							
						}
						// console.log(model.balances);
						
					});
				// check if there any user has already logged in to use it instead of the $rootScope
				userService
					.checkUserLogin()
					.then(function(user){
						if(user){
							model.loggedUser = user;
							// for(var i in user.payments){
							// 	for(var j in model.balances){
							// 		if(model.balances[j].eventId === user.payments[i].eventId){
							// 			model.balances[j].totalPayment += JSON.parse(user.payments[i].paymentAmount);
							// 		} else{
							// 			model.balances.push({
							// 				eventId: user.payments[i].eventId,
							// 				totalPayment: JSON.parse(user.payments[i].paymentAmount)
							// 			})
							// 		}
							// 	}
							// }
						}
					});

				// console.log(model.balances);
			}
			init();

			// model.eventRegistration = eventRegistration;
			model.logout = logout;
			model.makePayment = makePayment;
			model.getTotals = getTotals;

			function getTotals(user){
				var totalOfPayments = 0;
				for(var x in user.payments){
					totalOfPayments+= JSON.parse(user.payments[x].paymentAmount);
				}
				return {total: totalOfPayments, balance: totalOfPayments-model.eventDetails.price}
			}

			function makePayment(userId, eventId, payment){
				payment.eventId = eventId;
				payment.userId = userId;
				// console.log(eventId);
				// console.log(payment);
				userService
					.makePayment(payment)
					.then(function(result){
						console.log(result.data);
					})
			}

			function logout(){
				userService
					.logout()
					.then(function(){
						$location.url('/');
					});
			}



			// function eventRegistration(event){
			// 	if (!model.loggedUser){
			// 		model.error1 = 'Please login or register to register on this event';
			// 		return;
			// 	} else {
			// 		var userId = model.loggedUser._id;
			// 		var eventsList = model.loggedUser.registeredEventsList;
			// 		for(var e in eventsList){
			// 			if(eventsList[e]._id === event._id){
			// 				model.error2 = 'You already registered for this event';
			// 				return;
			// 			}
			// 		}
			// 		userService
			// 			.addEventToUserEventsList(event)
			// 			.then(function (response){
			// 			$location.url('/userProfile');
			// 		});
			// 	}
			// }

		}

})();