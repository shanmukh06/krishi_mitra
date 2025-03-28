// FarmAI Frontend Application
document.addEventListener('DOMContentLoaded', function() {
  const loadingElement = document.getElementById('loading');
  const errorElement = document.getElementById('error-message');
  const resultsElement = document.getElementById('advisory-results');

  // Check geolocation support
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser');
    return;
  }

  // Get current position
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      fetchAdvisory(lat, lng);
    },
    error => {
      showError(error);
    }
  );

  // Fetch advisory data
  function fetchAdvisory(lat, lng) {
    fetch(`http://localhost:8000/advisory?lat=${lat}&lng=${lng}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        showError(data.error);
      } else {
        displayAdvisory(data);
      }
    })
    .catch(error => {
      showError(error);
    });
  }

  // Display error message
  function showError(error) {
    loadingElement.style.display = 'none';
    errorElement.textContent = error.message || error;
    errorElement.style.display = 'block';
  }

  // Display advisory results
  function displayAdvisory(data) {
    loadingElement.style.display = 'none';
    // [Your existing display logic here]
  }
});