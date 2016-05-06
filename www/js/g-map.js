var mapInit = false,
	encounter = false,
	map = null,
	myMarker = null,
	myLocation = null,
	wild_pokemon = [];
	pokeMarker = [];

$(document).on("pageshow", "#home", function() {
	navigator.geolocation.getCurrentPosition(function(position) {
		// onSucces
		// if the map is not initialized
		if (!mapInit) {
			// map is not initialized
				// create new map

				map = new google.maps.Map(document.getElementById("gmap"), {
					center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
				// player marker
				myMarker = new google.maps.Marker({
					position: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					},
					map: map,
					icon: "./img/mapIcon27x30.png",
					title: "my location"
				});
				myMarker.setMap(map);

				// map is initialized, set mapInit true
				mapInit = true;
				$("#gmap").append("succes");

				getWildPokemon(position.coords);

		} else {
			// map is initialized
			$("#gmap").append("no succes");
		}
	}, function(error) {
		// onError
		$("#gmap").append("code: " + error.code + "\n" +
					"message: " + error.message + "\n");
		console.log("code: " + error.code + "\n" +
					"message: " + error.message + "\n");
	}, {
		// options
		maximumAge: 3000,
		timeout: 5000,
		enableHighAccuracy: true
	});
});