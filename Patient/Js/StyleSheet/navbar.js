// Load the navbar.html content into the div with id="navbar"
document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar').innerHTML = data;
      })
      .catch(error => console.log('Error loading navbar:', error));
  });
  