(function(){
	angular
		.module('jordanEvents')
		.controller('allEventsController', allEventsController);

	function allEventsController($routeParams, eventsService, userService, $location, $route){
		var model = this;
		model.position = {currentposition: {}};
		var mapFeatures = [];
		
		function init(){
			// To indicate that the events list is including all the events
			model.filtered = false;
			userService
					.checkUserLogin()
					.then(function(result){
						if(result){
							model.loggedUser = result;
							var birthDay = new Date(model.loggedUser.DOB);
							var today = new Date();
							model.loggedUser.age =  Math.abs((new Date(today - birthDay.getTime())).getUTCFullYear() - 1970);
							console.log(model.loggedUser.age);
						}
					});
			
			if($routeParams.makerId){
				var makerId = $routeParams.makerId;
				eventsService
					.createMakerEventsList(makerId)
					.then(function(eventsByMaker){
						if(model.loggedUser){
							model.eventsListByMaker = eventsByMaker.data.filter(function(event){return (event.ageGroup.ageFrom<=model.loggedUser.age && event.ageGroup.ageTo>=model.loggedUser.age);});
						}else{
							model.eventsListByMaker = eventsByMaker.data;
						}
					});
			}
			eventsService
				.eventConfig()
				.then(function(result){
					var eventsParams = result.data;
					var mapBoxKey = eventsParams.mapBoxKey;
					if(model.loggedUser){
						console.log(model.loggedUser.age);
						model.eventsList = eventsParams.eventsList.filter(function(event){return (event.ageGroup.ageFrom<=model.loggedUser.age && event.ageGroup.ageTo>=model.loggedUser.age);});
						console.log(model.eventsList)
					}else{
						model.eventsList = eventsParams.eventsList;
					}
					for(var e in model.eventsList){
						mapFeatures.push({"type": "Feature",
							              "properties": {
					                        "description": model.eventsList[e].name,
					                      },
					                      "geometry": {
					                        "type": "Point",
					                        "coordinates": model.eventsList[e].coordinates,
					                        "zoom": 5
					                    }
							            });
					}

						// MapBox Maps
					    // Get the access token from the server
					    mapboxgl.accessToken = mapBoxKey;
						
						// Initilise the map 
						var map = new mapboxgl.Map({
							container: 'mapContainer',
							style: 'mapbox://styles/mapbox/satellite-streets-v9',
							center: [35.87741988743201, 32.003009804995955],
							// center: [model.position.currentposition.lng, model.position.currentposition.lat],
							zoom: 10
						});

						// Show map controller
						map.addControl(new mapboxgl.NavigationControl());

						map.on('load', function () {
							// change the marker image
							map.loadImage('../../img/marker.png', function(error, image) {
								if(error){throw error}
								map.addImage('marker', image);
								
								// configuration for the marker 
								var placesOfEvents = {
								        "id": "places",
								        "type": "symbol",
								        "source": {
								            "type": "geojson",
								            "data": {
								                "type": "FeatureCollection",
								                "features": mapFeatures
								            }
								        },
								        "layout": {
								            "icon-image": "marker",
								            "icon-allow-overlap": true,
								            "icon-size": 0.20
								        }
								};

								// Add the markers to the map
								map.addLayer(placesOfEvents);

								// to fit the map to view all the places of events
							    var bounds = new mapboxgl.LngLatBounds();
							    placesOfEvents.source.data.features.forEach(function(feature) {
								    bounds.extend(feature.geometry.coordinates);
								});
								map.fitBounds(bounds, {padding:50});


								// to get the location from the mouse click on the map
								map.on('click', function(e) {
								    var latitude = e.lngLat.lat;
								    var longitude = e.lngLat.lng;
								    console.log(latitude + " - " + longitude)
								});

								// initialize the popup
								var popup = new mapboxgl.Popup({
							    	closeButton: false,
							    	closeOnClick: false
							    });

							    // Show the popup on mouse over the marker
							    // Change the cursor to a pointer when the mouse is over the places layer.
							    map.on('mouseenter', 'places', function (e) {
							        var coordinates = e.features[0].geometry.coordinates.slice();
							        var description = e.features[0].properties.description;

							        // Ensure that if the map is zoomed out such that multiple
							        // copies of the feature are visible, the popup appears
							        // over the copy being pointed to.
							        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
							            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
							        }

							        popup
							            .setLngLat(coordinates)
							            .setHTML(description)
							            .addTo(map);

							        map.getCanvas().style.cursor = 'pointer';
							    });

							    // Change it back to a pointer when it leaves and hide the popup.
							    map.on('mouseleave', 'places', function (e) {
							        map.getCanvas().style.cursor = '';
							        popup.remove();
							    });

							});
						});
					// }
					// getLocation()

				});

			// userService
			// 		.checkUserLogin()
			// 		.then(function(result){
			// 			if(result){
			// 				model.loggedUser = result;
			// 			}
			// 		});
			

			// eventsService
			// 	.getAllEvents()
			// 	.then(function(events){
			// 		model.eventsList = events;		
			// 	});
		}
		init();
		model.checkAge = checkAge;
		model.logout = logout;

		function checkAge(age){
			// temprary solving by reload to remove the filter and return to the original events list
			if(model.filtered){
				$route.reload();
			}
			console.log(age);
			model.eventsList = model.eventsList.filter(function(event){return (event.ageGroup.ageFrom<=age && event.ageGroup.ageTo>=age);});
			model.filtered = true;
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