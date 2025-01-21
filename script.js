var map;
var hospitals = {
    "Groot Schuur Hospital": { lat: -33.9413, lng: 18.4622 },
    "Khayelitsha Community Clinic": { lat: -34.0469, lng: 18.6747 },
    "Tygerberg Hospital": { lat: -33.9126, lng: 18.6058 },
    "Victoria Hospital": { lat: -34.0163, lng: 18.4636 },
    "Red Cross War Memorial Children's Hospital": { lat: -33.9405, lng: 18.4852 },
    "Mitchells Plain District Hospital": { lat: -34.0406, lng: 18.5921 },
    "Somerset Hospital": { lat: -33.9095, lng: 18.4195 }
};
var ambulanceMarker;
var userMarker;
var userLocation;
var ambulanceMovementInterval; // Store the interval ID for ambulance movement

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.9249, lng: 18.4241 }, // Center map in Cape Town
        zoom: 12
    });

    // Add hospital markers to the map
    for (var hospital in hospitals) {
        var marker = new google.maps.Marker({
            position: hospitals[hospital],
            map: map,
            title: hospital
        });

        var infowindow = new google.maps.InfoWindow({
            content: hospital
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }
}

function locateHospital(hospitalName) {
    var location = hospitals[hospitalName];
    if (location) {
        map.setCenter(location);
        map.setZoom(15);

        new google.maps.InfoWindow({
            content: hospitalName
        }).open(map, new google.maps.Marker({ position: location, map: map }));
    }
}

function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            if (userMarker) {
                userMarker.setMap(null);
            }

            // Place user location marker
            userMarker = new google.maps.Marker({
                position: userLocation,
                map: map,
                label: '📍', // User location marker
                title: "Your location"
            });

            map.setCenter(userLocation);
            map.setZoom(14);
        }, function () {
            alert('Geolocation failed!');
        }, {
            enableHighAccuracy: true, // Enable high accuracy for better location precision
            timeout: 10000, // Timeout after 10 seconds
            maximumAge: 0 // Prevent using cached locations
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function requestAmbulance() {
    if (!userLocation) {
        alert("Please share your location first.");
        return;
    }

    var selectedHospital = document.getElementById("hospitalSelect").value;
    if (!selectedHospital) {
        alert("Please select a hospital first.");
        return;
    }

    var hospitalLocation = hospitals[selectedHospital];
    fetchRoute(hospitalLocation, userLocation);

    // Show the cancel button when an ambulance is requested
    document.getElementById("cancelBtn").style.display = "inline";
}

var directionsRenderer;
function fetchRoute(origin, destination) {
    var directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            var route = result.routes[0].overview_path;
            var eta = result.routes[0].legs[0].duration.text;
            updateETA(eta);

            simulateAmbulanceMovement(route);
        } else {
            console.error('Directions request failed due to ' + status);
        }
    });
}

function simulateAmbulanceMovement(route) {
    if (ambulanceMarker) {
        ambulanceMarker.setMap(null);
    }

    ambulanceMarker = new google.maps.Marker({
        position: route[0],
        map: map,
        label: '🚑', // Use emoji label for ambulance marker
        title: "Ambulance is on the way!"
    });

    let index = 0;
    ambulanceMovementInterval = setInterval(function () {
        index++;
        if (index < route.length) {
            ambulanceMarker.setPosition(route[index]);

            // Rotate ambulance icon based on movement direction
            var heading = google.maps.geometry.spherical.computeHeading(route[index - 1], route[index]);
            ambulanceMarker.setIcon({
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                rotation: heading,
                scale: 6,
                fillColor: '#FF0000',
                fillOpacity: 1,
                strokeWeight: 2
            });
        } else {
            clearInterval(ambulanceMovementInterval);
            document.getElementById('etaDisplay').innerText = "Ambulance has arrived!";
            alert('Ambulance has arrived!');
        }
    }, 1000);
}

function updateETA(eta) {
    document.getElementById('eta').innerText = eta;
}

function filterHospitals() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var select = document.getElementById("hospitalSelect");
    for (var i = 0; i < select.options.length; i++) {
        var option = select.options[i];
        if (option.text.toLowerCase().indexOf(input) > -1) {
            option.style.display = "";
        } else {
            option.style.display = "none";
        }
    }
}

function cancelAmbulanceRequest() {
    // Display a dialog with the "This page says" format
    alert("Ambulance request has been canceled!");

    // Clear the ambulance movement simulation
    clearInterval(ambulanceMovementInterval);

    // Remove ambulance marker from the map
    if (ambulanceMarker) {
        ambulanceMarker.setMap(null);
        ambulanceMarker = null; // Reset the ambulance marker variable
    }

    // Clear the route if it exists
    if (directionsRenderer) {
        directionsRenderer.setMap(null); // Removes the route from the map
        directionsRenderer = null; // Reset directionsRenderer for future requests
    }

    // Hide the cancel button
    document.getElementById("cancelBtn").style.display = "none";
}
window.onload = initMap;
