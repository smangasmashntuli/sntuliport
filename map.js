const chickenLickenStores = [
    { name: "Chicken Licken Braamfontein", lat: -26.1931, lon: 28.0301 },
  { name: "Chicken Licken Sandton", lat: -26.1076, lon: 28.0567 },
  { name: "Chicken Licken Soweto", lat: -26.2485, lon: 27.8540 },
  { name: "Chicken Licken Pretoria", lat: -25.7461, lon: 28.1881 },
  { name: "Chicken Licken Cape Town", lat: -33.9249, lon: 18.4241 },
  { name: "Chicken Licken Durban", lat: -29.8587, lon: 31.0218 }
]

const map = L.map('map').setView([0, 0], 2); 

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        let userMarker;
        let storeMarker;
        let routeControl;

        window.onload = () => {
            const storeSelect = document.getElementById("store");
            chickenLickenStores.forEach(store => {
                const option = document.createElement("option");
                option.value = JSON.stringify({lat: store.lat, lon: store.lon});
                option.textContent = store.name;
                storeSelect.appendChild(option);
            });
        };
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
            const storeValue = document.getElementById('store').value;
            if (!storeValue) {
                alert('Please select a store.');
                return;
            }

            const { lat, lon } = JSON.parse(storeValue);

            if (storeMarker) {
                map.removeLayer(storeMarker);
            }

            const storeLatLng = [parseFloat(lat), parseFloat(lon)];
            storeMarker = L.marker(storeLatLng).addTo(map).bindPopup("Store Location").openPopup();
            map.setView(storeLatLng, 14);
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

        routeControl = L.Routing.control({
        waypoints: [
        L.latLng(storeLatLng.lat, storeLatLng.lng),
        L.latLng(userLatLng.lat, userLatLng.lng)
        ],
        routeWhileDragging: false,
        createMarker: () => null,
        lineOptions: {
        styles: [{ color: '#007bff', weight: 5, opacity: 0.7 }]
        }
        }).addTo(map);

    routeControl.on('routesfound', function (e) {
    const route = e.routes[0];
    const coordinates = route.coordinates;
    let currentIndex = 0;

    const deliveryMarker = L.marker(coordinates[0], {
      icon: L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })
    }).addTo(map).bindPopup("Delivery in progress...").openPopup();

    const name = document.getElementById('name').value;

    const interval = setInterval(() => {
      if (currentIndex >= coordinates.length - 1) {
        clearInterval(interval);
        deliveryMarker.setLatLng(coordinates[coordinates.length - 1])
          .bindPopup("Order Delivered!").openPopup();
        alert(`${name}, your delivery has arrived!`);
        return;
      }

      currentIndex++;
      deliveryMarker.setLatLng(coordinates[currentIndex]);
    }, 350);
  });
}
