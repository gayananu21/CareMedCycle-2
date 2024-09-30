// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Fetch the navbar HTML and insert it at the top of the page
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        });

    // Initialize the bar chart for Weekly Activities Overview
    const ctx = document.getElementById('weeklyActivitiesChart').getContext('2d');
    const weeklyActivitiesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Exercise', 'Meditation', 'Therapy'], // Activity labels
            datasets: [{
                label: 'Number of Sessions',
                data: [5, 4, 2], // Static data for now, can be updated dynamically
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
