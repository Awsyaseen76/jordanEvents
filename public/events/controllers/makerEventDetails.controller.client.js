(function(){
	angular
		.module('jordanEvents')
		.controller('makerEventDetails', makerEventDetails);

		function makerEventDetails($scope, $routeParams, eventsService, userService, $location, $route, loggedMaker){
			
			var model = this;
			model.logout = logout;
			model.makePayment = makePayment;
			model.getTotals = getTotals;
			model.confirmAttendance = confirmAttendance;
			model.today = new Date();
			model.attendanceArray = [];
			model.countAttendance = countAttendance;
			model.specialDiscountAmount = 1;
			// this is temporary in future the event maker created the discountTypes array
			model.discountTypes = [
									{name: 'Discount type...',
									 amount: 0},
									{name: 'family',
									 amount: 10},
									{name: 'group',
									 amount: 10},
									{name: 'special',
									 types: [
									 		{name: 'special25', amount: 25}, 
									 		{name: 'special50', amount: 50},
									 		{name: 'special75', amount: 75},
									 		{name: 'special100', amount: 100}
									 	]
									 }
									 
								  ];

			model.paymentTypes = [
									{name: 'Payment type...'},
									{name: 'Down payment'},
									{name: 'Weekly payment'},
									{name: 'Full payment'},
								 ];


			model.selectDiscount = selectDiscount;
			model.selectPaymentType = selectPaymentType;
			model.giveADiscountError = false;
			model.giveADiscount = giveADiscount;



			function init(){
				model.loggedMaker = loggedMaker;
				model.error2 = null;
				model.grandTotalPayments = 0;
				model.eventFeedback = [];
				var eventId = $routeParams.eventId;
				
				// for default select option the first one is the title
				model.selectedDiscount = model.discountTypes[0];
				model.typeOfPayment = model.paymentTypes[0];
				model.thereIsSpecialDiscount = false;
				model.hadDiscount = hadDiscount;

				eventsService
					.findEventByEventId(eventId)
					.then(function(eventDetails){
						model.eventDetails = eventDetails;
						model.discountedMembers = eventDetails.discountedMembers;
						// loop on the registered members
						for(var x in eventDetails.registeredMembers){
							// Calculate the grand total payments
							for(var j in eventDetails.registeredMembers[x].payments){
								if(eventDetails.registeredMembers[x].payments[j].eventId === eventDetails._id){
									model.grandTotalPayments+= JSON.parse(eventDetails.registeredMembers[x].payments[j].paymentAmount);
								}
							}
							// Collect the feedbacks
							for(var e in model.eventDetails.registeredMembers[x].userFeedback){
								if(model.eventDetails.registeredMembers[x].userFeedback[e].eventId === eventId){
									var feed = model.eventDetails.registeredMembers[x].userFeedback[e];
									feed.userName = model.eventDetails.registeredMembers[x].name.firstName + " " + model.eventDetails.registeredMembers[f].name.lastName;
									model.eventFeedback.push(feed);
								}
							}
						}
						// Calculate the total income from the event
						var totalOfMembers = model.eventDetails.registeredMembers.length;
						var membersWithoutDiscount = totalOfMembers - model.discountedMembers.length;
						var incomeFromNoDiscount = membersWithoutDiscount * model.eventDetails.price; 
						var incomeFromDiscounted = 0;

						for(var n in model.discountedMembers){
							incomeFromDiscounted += model.eventDetails.price* model.discountedMembers[n].percentage;
						}
						model.totalIncomeFromEvent = incomeFromDiscounted + incomeFromNoDiscount ;
					});
			}
			init();

			// Check if user had a discount then disabled the discount button
			function hadDiscount(userId, cb){
				var alreadyHad = false;
				for(var d in model.discountedMembers){
					if(model.discountedMembers[d].userId === userId){
						alreadyHad = true;
					}
				}
				if(cb){
					cb(alreadyHad);
				}else{
					return alreadyHad;
				}
			}


			function selectDiscount(name){
				model.discountTags = {};
				var today = new Date();
				var tagCode = today.getHours()+''+today.getDate()+''+today.getMonth()+''+today.getFullYear()+'';
				if(model.selectedDiscount.name === 'family'){
					model.discountTags.familyTag = name.middleName+name.lastName+tagCode;
					model.discountTags.groupTag = '';
					model.thereIsFamilyDiscount = true;
					model.thereIsSpecialDiscount = false;
					model.thereIsGroupDiscount = false;
					return;
				}else if(model.selectedDiscount.name === 'group'){
					model.discountTags.groupTag = tagCode;
					model.discountTags.familyTag = '';
					model.thereIsGroupDiscount = true;
					model.thereIsSpecialDiscount = false;
					model.thereIsFamilyDiscount = false;
					return;
				}
				else if(model.selectedDiscount.name === 'special'){
					model.thereIsSpecialDiscount = true;
					model.thereIsFamilyDiscount = false;
					model.thereIsGroupDiscount = false;
					return;
				}else if(model.selectedDiscount.name === 'Discount type...'){
					model.thereIsSpecialDiscount = false;
					model.thereIsFamilyDiscount = false;
					model.thereIsGroupDiscount = false;

				}

			}

			

			function selectPaymentType(paymentType, user){
				 
				var eventId = model.eventDetails._id;
				var balance = getTotals(user, eventId).eventId.balance;
				var eventPrice = null;
				var eventSessions = model.eventDetails.eventDays.length;
				// var discountedMembers = model.eventDetails.discountedMembers;
				for(var d in model.discountedMembers){
					if(model.discountedMembers[d].userId === user._id){
						eventPrice = model.eventDetails.price * model.discountedMembers[d].percentage; 
					}
				}if(!eventPrice){
					eventPrice = model.eventDetails.price;
				}
				switch (paymentType.name) {
					case 'Weekly payment':
						model.paymentAmount = eventPrice/4;
						break;
					case 'Full payment':
						model.paymentAmount = Math.abs(balance);
						// document.getElementById('paymentAmount').value = model.paymentAmount;
						break;
					case 'Down payment':
						model.paymentAmount = eventPrice/eventSessions;
						// document.getElementById('paymentAmount').value = model.paymentAmount;
						break;
					case 'Payment type...':
						model.paymentAmount = 0;
						// document.getElementById('paymentAmount').value = '';
						break;
				}
				console.log(paymentType.name, eventPrice, model.paymentAmount);
			}

			function giveADiscount(userId, eventId, discountName, discountTags, specialDiscountType){
				// Check first if the user already had a discount before...
				// for(var d in model.discountedMembers){
				// 	if(model.discountedMembers[d].userId === userId){
				// 		model.giveADiscountError = 'This user already had a '+ model.discountedMembers[d].discountType + 'discount';
				// 	}
				// }
				// How to cancel the request????????????
				var discount = {};
				discount.userId = userId;
				discount.eventId = eventId;
				switch (discountName){
					case 'special':
						discount.discountType = discountName;
						switch (specialDiscountType) {
							case 'special25':
								discount.discountTag = 'special25';
								discount.percentage = 0.75;
								break;
							case 'special50':
								discount.discountTag = 'special50';
								discount.percentage = 0.50;
								break;
							case 'special75':
								discount.discountTag = 'special75';
								discount.percentage = 0.25;
								break;
							case 'special100':
								discount.discountTag = 'special100';
								discount.percentage = 0;
								break;
						}
						break;
					
					case 'family':
						discount.discountType = discountName;
						discount.discountTag = discountTags.familyTag;
						discount.percentage = 0.9;
						break;
					case 'group':
						discount.discountType = discountName;
						discount.discountTag = discountTags.groupTag;
						discount.percentage = 0.9;
						break;
				}
				// discountedMembers.push(discount);
				// console.log(discountedMembers);
				hadDiscount(userId, function(alreadyHad){
					if(!alreadyHad){
						eventsService
							.addToDiscountedMembers(discount)
							.then(function(result){
								if(result.data._id){
									console.log('User Added...');
									model.giveADiscountError = false;
								}else{
									model.giveADiscountError = result.data;
								}
								$route.reload();
							});
					}	
				});
				

				// $scope.form.discountForm.$setPristine();
				// $('#discountForm').trigger("reset()");
				// document.getElementById('discountForm').$setPristine();
			}




			function countAttendance(attendees){
				model.attendedM = 0;
				model.attendanceArray = [];
				
				for(var m in model.eventDetails.registeredMembers){
					model.attendanceArray.push({
						eventId: model.eventDetails._id,
						userId: model.eventDetails.registeredMembers[m]._id,
						date: new Date().toDateString(),
						attended: false
					});
				}


				for(var n in model.attendanceArray){
					for(var x in Object.keys(attendees)){
						if(Object.keys(attendees)[x] === model.attendanceArray[n].userId){
							model.attendanceArray[n].attended = attendees[Object.keys(attendees)[x]];
							Object.keys(attendees).splice(x, 1);
						}
					}
				}


				for(var j in model.attendanceArray){
					if(model.attendanceArray[j].attended === true){
						model.attendedM+=1;
					}
				}
			}
			

			// make it on the database
			function confirmAttendance(totalAttended){
				userService
					.confirmAttendance(totalAttended)
					.then(function(result){
					});
			}

			
			function getTotals(user, eventId){
				var eventPrice = null;
				var discountTag = null;
				// Calculate the event price for user that they have a discount
				for(var d in model.discountedMembers){
					if(model.discountedMembers[d].userId === user._id){
						eventPrice = model.eventDetails.price * model.discountedMembers[d].percentage;
						discountType = model.discountedMembers[d].discountType; 
						discountTag = model.discountedMembers[d].discountTag;
					}
				}
				

				var totalOfPayments = 0;
				// search for the user if he is in the discounted members then calculate the price and the balance
				// Calculate user's total of payments
				for(var x in user.payments){
					if(user.payments[x].eventId === eventId){
						totalOfPayments+= JSON.parse(user.payments[x].paymentAmount);
					}
				}
				if(eventPrice){
					return {eventId:{eventPrice: eventPrice, discountType: discountType, discountTag: discountTag, total: totalOfPayments, balance: totalOfPayments-eventPrice}};	
				}else{
					return {eventId:{eventPrice: model.eventDetails.price, discountType: 'No discount.', discountTag: 'No discount', total: totalOfPayments, balance: totalOfPayments-model.eventDetails.price}};
				}
			}

			function makePayment(userId, eventId, paymentDate, paymentAmount){
				var payment = {};
				payment.eventId = eventId;
				payment.userId = userId;
				payment.paymentDate = paymentDate;
				payment.paymentAmount = paymentAmount;
				userService
					.makePayment(payment)
					.then(function(result){
						console.log('Payment done...');
						$route.reload();
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

