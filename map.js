// frontend/map.js
const map = L.map('map').setView([51.505, -0.09], 13); // Default map position

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let userLocation = null;
const fountainMarkers = [];

// Fetch fountains from the backend and plot them on the map
axios.get('http://localhost:5000/api/fountains')
  .then(response => {
    const fountains = response.data;
    fountains.forEach(fountain => {
      const marker = L.marker([fountain.location.lat, fountain.location.lng]).addTo(map);
      marker.bindPopup(`${fountain.name}: ${fountain.status}`).openPopup();
      fountainMarkers.push({ fountain, marker });
    });
  })
  .catch(error => {
    console.error('Error fetching fountains:', error);
  });

// Button to find the user's location
document.getElementById('findRouteButton').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setView([userLocation.lat, userLocation.lng], 13);
      L.marker([userLocation.lat, userLocation.lng]).addTo(map)
        .bindPopup('Your Location').openPopup();
    }, () => {
      alert('Location access denied.');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});

// Use Google Maps Directions API to calculate the fastest route to the nearest fountain
function findFastestRoute() {
  if (userLocation && fountainMarkers.length > 0) {
    let nearestFountain = null;
    let shortestDistance = Infinity;

    // Find the nearest fountain
    fountainMarkers.forEach(fountainData => {
      const distance = calculateDistance(userLocation, fountainData.fountain.location);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestFountain = fountainData;
      }
    });

    if (nearestFountain) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      directionsRenderer.setMap(map);

      const request = {
        origin: new google.maps.LatLng(userLocation.lat, userLocation.lng),
        destination: new google.maps.LatLng(nearestFountain.fountain.location.lat, nearestFountain.fountain.location.lng),
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          alert('Directions request failed due to ' + status);
        }
      });
    }
  } else {
    alert('Unable to determine location or fountains.');
  }
}

function calculateDistance(loc1, loc2) {
  const lat1 = loc1.lat;
  const lon1 = loc1.lng;
  const lat2 = loc2.lat;
  const lon2 = loc2.lng;

  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
