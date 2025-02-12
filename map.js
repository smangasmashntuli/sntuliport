const map = L.map('map').setView([0, 0], 2); 

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        let userMarker;
        let storeMarker;
        let routeControl;

        // Function to geocode a location and place a marker
        async function geocodeLocation(location, popupText, isStore = false) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
                );
                const data = await response.json();

                if (data.length === 0) {
                    alert(`${popupText} location not found.`);
                    return null;
                }

                const { lat, lon } = data[0];
                const latLng = [parseFloat(lat), parseFloat(lon)];

                const marker = L.marker(latLng).addTo(map).bindPopup(popupText).openPopup();

                if (isStore || !userMarker) {
                    map.setView(latLng, 14);
                }

                return marker;
            } catch (error) {
                alert(`Error fetching ${popupText} location data. Please try again.`);
                return null;
            }
        }

        // This function is for searching user's location
        async function searchUserLocation() {
            const userLocation = document.getElementById('location').value;
            if (!userLocation) {
                alert('Please enter your location.');
                return;
            }

            if (userMarker) {
                map.removeLayer(userMarker);
            }
            userMarker = await geocodeLocation(userLocation, "Your Location");
        }

        // Also this function is for searching store location
        async function searchStoreLocation() {
            const storeLocation = document.getElementById('store').value;
            if (!storeLocation) {
                alert('Please enter the store location.');
                return;
            }

            if (storeMarker) {
                map.removeLayer(storeMarker);
            }
            storeMarker = await geocodeLocation(storeLocation, "Store Location", true);
        }

        function simulateDelivery() {
            if (!userMarker || !storeMarker) {
                alert('Please provide both store and user locations first.');
                return;
            }

            const userLatLng = userMarker.getLatLng();
            const storeLatLng = storeMarker.getLatLng();

            if (routeControl) {
                map.removeControl(routeControl);
            }

            // Here Leaflet Routing Machine to calculate the route is implemented
            routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(storeLatLng.lat, storeLatLng.lng),
                    L.latLng(userLatLng.lat, userLatLng.lng),
                ],
                routeWhileDragging: false,
                createMarker: function () {
                    return null;
                },
                lineOptions: {
                    styles: [{ color: '#007bff', weight: 5, opacity: 0.7 }],
                },
            }).addTo(map);

            // Add a moving delivery marker
            routeControl.on('routesfound', function (e) {
                const route = e.routes[0];
                const coordinates = route.coordinates; 
                let currentIndex = 0;

                const deliveryMarker = L.marker(coordinates[0], {
                    icon: L.icon({
                        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                    }),
                }).addTo(map).bindPopup("Delivery in progress...").openPopup();

				const name = document.getElementById('name').value;
                const interval = setInterval(() => {
                    if (currentIndex >= coordinates.length - 1) {
                        clearInterval(interval);
                        deliveryMarker.setLatLng(coordinates[coordinates.length - 1])
                            .bindPopup("Order Delivered!").openPopup();
							alert(`${name} Delivery guy is waiting for you.`);
                        return;
                    }

                    currentIndex++;
                    deliveryMarker.setLatLng(coordinates[currentIndex]);
                }, 350);
            });
        }
