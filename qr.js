// frontend/qr.js
function scanQRCode() {
  const fountainId = 'someFountainIdFromQR'; // Replace with actual scanned ID
  axios.get(`http://localhost:5000/api/fountains/${fountainId}`)
    .then(response => {
      displayFountainInfo(response.data);
    })
    .catch(error => {
      console.error('Error fetching fountain data:', error);
    });
}
