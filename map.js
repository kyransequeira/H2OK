// frontend/map.js
const map = L.map('map').setView([51.505, -0.09], 13); // Default map position

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

axios.get('http://localhost:5000/api/fountains')
  .then(response => {
    const fountains = response.data;
    fountains.forEach(fountain => {
      const marker = L.marker([fountain.location.lat, fountain.location.lng]).addTo(map);
      marker.bindPopup(`${fountain.name}: ${fountain.status}`).openPopup();

      marker.on('click', () => {
        displayFountainInfo(fountain);
      });
    });
  })
  .catch(error => {
    console.error('Error fetching fountains:', error);
  });

function displayFountainInfo(fountain) {
  document.getElementById('status').innerText = `Status: ${fountain.status}`;
  document.getElementById('updateStatusButton').onclick = () => updateStatus(fountain);
}

function updateStatus(fountain) {
  const newStatus = fountain.status === 'working' ? 'broken' : 'working';
  axios.put(`http://localhost:5000/api/fountains/${fountain._id}`, { status: newStatus })
    .then(response => {
      alert('Fountain status updated!');
      displayFountainInfo(response.data);
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
}
