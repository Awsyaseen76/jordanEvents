(function(){
	angular
		.module('jordanEvents')
		.controller('homePageController', homePageController);

	
	function homePageController(userService, $location, eventsService, $route){
		var model = this;
		model.position = {
							currentposition: {}
		};

		model.eventsPlaces = [];
		model.eventsParams = [];

		function init(){
			// model.loggedUser = null;
			userService
				.checkUserLogin()
				.then(function(result){
					if(result){
						model.loggedUser = result;
						return;
					}else{
						model.loggedUser = null;
						return;
					}
				});

			eventsService
				.getAllEvents()
				.then(function(events){
					model.eventsList = events;
					if(events){
						for(var event in events){
							if(events[event].special){
								model.specialEvent = events[event];
								return;
							}
						}
					}		
				});

				

				eventsService
					.mapConfig()
					.then(function(result){
						var mapParams = result.data;
						var mapBoxKey = mapParams.mapBoxKey;
						
						for(var e in mapParams.eventsList){
							model.eventsParams.push({
							                    "type": "Feature",
							                    "properties": {
							                        "description": mapParams.eventsList[e].name,
							                        "icon": "star"
							                    },
							                    "geometry": {
							                        "type": "Point",
							                        "coordinates": mapParams.eventsList[e].coordinates
							                    }
							})
						}

						function getLocation() {
						    if (navigator.geolocation) {
						        navigator.geolocation.getCurrentPosition(showPosition);
						    } else { 
						        console.log("Geolocation is not supported by this browser.");
						    }
						}

						function showPosition(position) {

							// console.log(model.eventsList);
						    model.position.currentposition.lat = position.coords.latitude; 
						    model.position.currentposition.lng = position.coords.longitude;

			    			// MapBox Maps
						    mapboxgl.accessToken = mapBoxKey;
							var map = new mapboxgl.Map({
								container: 'mapContainer',
								style: 'mapbox://styles/mapbox/streets-v10',
								center: [model.position.currentposition.lng, model.position.currentposition.lat],
								zoom: 15
							});
							map.addControl(new mapboxgl.NavigationControl());

							map.on('load', function () {
							    // Add a layer showing the places.
							    console.log(model.eventsParams);
							    var placesOfEvents = {
							        "id": "places",
							        "type": "symbol",
							        "source": {
							            "type": "geojson",
							            "data": {
							                "type": "FeatureCollection",
							                "features": model.eventsParams
							                // "features": [{
							                //     "type": "Feature",
							                //     "properties": {
							                //         "description": "<strong>Aws's house</strong><p><a href=\"http://www.google.com\" target=\"_blank\" title=\"Opens in a new window\">This is my house</a> it is in Amman - Jordan - basil alyazoory street</p>",
							                //         "icon": "star"
							                //     },
							                //     "geometry": {
							                //         "type": "Point",
							                //         "coordinates": [model.position.currentposition.lng, model.position.currentposition.lat]
							                //     }
							                // },
							                // {
							                //     "type": "Feature",
							                //     "properties": {
							                //         "description": "<strong>Aws's house 2</strong><p><a href=\"http://www.google.com\" target=\"_blank\" title=\"Opens in a new window\">This is my house</a> it is in Amman - Jordan - basil alyazoory street</p>",
							                //         "icon": "star"
							                //     },
							                //     "geometry": {
							                //         "type": "Point",
							                //         "coordinates": [model.position.currentposition.lng+.010, model.position.currentposition.lat+.010]
							                //     }
							                // },
							                // {
							                //     "type": "Feature",
							                //     "properties": {
							                //         "description": "<strong>Aws's house 3</strong><p><a href=\"http://www.google.com\" target=\"_blank\" title=\"Opens in a new window\">This is my house</a> it is in Amman - Jordan - basil alyazoory street</p>",
							                //         "icon": "star"
							                //     },
							                //     "geometry": {
							                //         "type": "Point",
							                //         "coordinates": [model.position.currentposition.lng-.001, model.position.currentposition.lat+.02]
							                //     }
							                // }]
							            }
							        },
							        "layout": {
							            "icon-image": "{icon}-15",
							            "icon-allow-overlap": true
							        }
							    }
							    map.addLayer(placesOfEvents);

							    // // Add marker to map
							   //  var marker = new mapboxgl.Marker()
								  // .setLngLat([35.8772, 32.00319])
								  // .addTo(map);


							    // to fit the map to view all the places of events
							    var bounds = new mapboxgl.LngLatBounds();
							    placesOfEvents.source.data.features.forEach(function(feature) {
								    bounds.extend(feature.geometry.coordinates);
								});
								map.fitBounds(bounds, {padding:50});

							    // When a click event occurs on a feature in the places layer, open a popup at the
							    // location of the feature, with description HTML from its properties.
							    map.on('click', 'places', function (e) {
							        var coordinates = e.features[0].geometry.coordinates.slice();
							        var description = e.features[0].properties.description;

							        // Ensure that if the map is zoomed out such that multiple
							        // copies of the feature are visible, the popup appears
							        // over the copy being pointed to.
							        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
							            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
							        }

							        new mapboxgl.Popup()
							            .setLngLat(coordinates)
							            .setHTML(description)
							            .addTo(map);
							    });

							    map.on('click', function(e) {
								    var latitude = e.lngLat.lat;
								    var longitude = e.lngLat.lng;
								    console.log(latitude + " - " + longitude)
								})


							    // Change the cursor to a pointer when the mouse is over the places layer.
							    map.on('mouseenter', 'places', function () {
							        map.getCanvas().style.cursor = 'pointer';
							    });

							    // Change it back to a pointer when it leaves.
							    map.on('mouseleave', 'places', function () {
							        map.getCanvas().style.cursor = '';
							    });
							});
						}
						getLocation();
					})


			// function getLocation() {
			//     if (navigator.geolocation) {
			//         navigator.geolocation.getCurrentPosition(showPosition);
			//     } else { 
			//         console.log("Geolocation is not supported by this browser.");
			//     }
			// }

			// function showPosition(position) {
			//     model.position.currentposition.lat = position.coords.latitude; 
			//     model.position.currentposition.lng = position.coords.longitude;

   //  			// MapBox Maps
			//     mapboxgl.accessToken = 'asdasd'//process.env.mapboxAccessToken;
			// 	var map = new mapboxgl.Map({
			// 		container: 'mapContainer',
			// 		style: 'mapbox://styles/mapbox/streets-v10',
			// 		center: [model.position.currentposition.lng, model.position.currentposition.lat],
			// 		zoom: 15
			// 	});
			// 	map.addControl(new mapboxgl.NavigationControl());

			// 	map.on('load', function () {
			// 	    // Add a layer showing the places.
			// 	    var placesOfEvents = {
			// 	        "id": "places",
			// 	        "type": "symbol",
			// 	        "source": {
			// 	            "type": "geojson",
			// 	            "data": {
			// 	                "type": "FeatureCollection",
			// 	                "features": [{
			// 	                    "type": "Feature",
			// 	                    "properties": {
			// 	                        "description": "<strong>Aws's house</strong><p><a href=\"http://www.google.com\" target=\"_blank\" title=\"Opens in a new window\">This is my house</a> it is in Amman - Jordan - basil alyazoory street</p>",
			// 	                        "icon": "star"
			// 	                    },
			// 	                    "geometry": {
			// 	                        "type": "Point",
			// 	                        "coordinates": [model.position.currentposition.lng, model.position.currentposition.lat]
			// 	                    }
			// 	                },
			// 	                {
			// 	                    "type": "Feature",
			// 	                    "properties": {
			// 	                        "description": "<strong>Aws's house 2</strong><p><a href=\"http://www.google.com\" target=\"_blank\" title=\"Opens in a new window\">This is my house</a> it is in Amman - Jordan - basil alyazoory street</p>",
			// 	                        "icon": "star"
			// 	                    },
			// 	                    "geometry": {
			// 	                        "type": "Point",
			// 	                        "coordinates": [model.position.currentposition.lng+.010, model.position.currentposition.lat+.010]
			// 	                    }
			// 	                },
			// 	                {
			// 	                    "type": "Feature",
			// 	                    "properties": {
			// 	                        "description": "<strong>Aws's house 3</strong><p><a href=\"http://www.google.com\" target=\"_blank\" title=\"Opens in a new window\">This is my house</a> it is in Amman - Jordan - basil alyazoory street</p>",
			// 	                        "icon": "star"
			// 	                    },
			// 	                    "geometry": {
			// 	                        "type": "Point",
			// 	                        "coordinates": [model.position.currentposition.lng-.001, model.position.currentposition.lat+.02]
			// 	                    }
			// 	                }]
			// 	            }
			// 	        },
			// 	        "layout": {
			// 	            "icon-image": "{icon}-15",
			// 	            "icon-allow-overlap": true
			// 	        }
			// 	    }
			// 	    map.addLayer(placesOfEvents);

			// 	    // // Add marker to map
			// 	   //  var marker = new mapboxgl.Marker()
			// 		  // .setLngLat([35.8772, 32.00319])
			// 		  // .addTo(map);


			// 	    // to fit the map to view all the places of events
			// 	    var bounds = new mapboxgl.LngLatBounds();
			// 	    placesOfEvents.source.data.features.forEach(function(feature) {
			// 		    bounds.extend(feature.geometry.coordinates);
			// 		});
			// 		map.fitBounds(bounds, {padding:50});

			// 	    // When a click event occurs on a feature in the places layer, open a popup at the
			// 	    // location of the feature, with description HTML from its properties.
			// 	    map.on('click', 'places', function (e) {
			// 	        var coordinates = e.features[0].geometry.coordinates.slice();
			// 	        var description = e.features[0].properties.description;

			// 	        // Ensure that if the map is zoomed out such that multiple
			// 	        // copies of the feature are visible, the popup appears
			// 	        // over the copy being pointed to.
			// 	        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			// 	            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			// 	        }

			// 	        new mapboxgl.Popup()
			// 	            .setLngLat(coordinates)
			// 	            .setHTML(description)
			// 	            .addTo(map);
			// 	    });

			// 	    // Change the cursor to a pointer when the mouse is over the places layer.
			// 	    map.on('mouseenter', 'places', function () {
			// 	        map.getCanvas().style.cursor = 'pointer';
			// 	    });

			// 	    // Change it back to a pointer when it leaves.
			// 	    map.on('mouseleave', 'places', function () {
			// 	        map.getCanvas().style.cursor = '';
			// 	    });
			// 	});

			// }

			// getLocation();
			
			

			console.log('Maps')
		}
		init();

		model.logout = logout;


		function logout(){
			userService
				.logout()
				.then(function(){
					$location.url('/');
					$route.reload();
				});
		}


	}
})();