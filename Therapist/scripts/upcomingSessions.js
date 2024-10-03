document.addEventListener('DOMContentLoaded', () => {
    // Fetch upcoming sessions from the server
    fetch('http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/get_upcoming_sessions.php')
        .then(response => response.json())
        .then(data => {
            const sessionsGrid = document.querySelector('.sessions-grid');

            // Clear any existing content
            sessionsGrid.innerHTML = '';

            data.forEach(session => {
                // Create a div for each session card
                const sessionCard = document.createElement('div');
                sessionCard.classList.add('session-card');

                // Session header with name and edit icon
                const sessionHeader = document.createElement('div');
                sessionHeader.classList.add('session-header');
                sessionHeader.innerHTML = `
                    <h2>${session.session_name}</h2>
                    <i class="fas fa-pencil-alt edit-icon" data-session="${session.id}"></i>
                `;

                // Session details
                const sessionDetails = document.createElement('div');
                sessionDetails.classList.add('session-details');
                sessionDetails.innerHTML = `
                    <p><strong>Date:</strong> ${session.session_date}</p>
                    <p><strong>Time:</strong> ${session.session_time_start} - ${session.session_time_end}</p>
                    <p><strong>Location:</strong> ${session.location}</p>
                    <p><strong>Patients:</strong></p>
                `;

                // Create patient avatars
                const patientsDiv = document.createElement('div');
                patientsDiv.classList.add('patients');

                session.patients.forEach(patient => {
                    const patientDiv = document.createElement('div');
                    patientDiv.classList.add('patient');
                    patientDiv.innerHTML = `
                        <img src="${patient.profile_image}" alt="${patient.name}">
                        <span>${patient.name}</span>
                    `;
                    patientsDiv.appendChild(patientDiv);
                });

                // Append details and patients to the card
                sessionDetails.appendChild(patientsDiv);
                sessionCard.appendChild(sessionHeader);
                sessionCard.appendChild(sessionDetails);
                sessionsGrid.appendChild(sessionCard);

                // Add click event listener for toggling session details
                sessionCard.addEventListener('click', function () {
                    // Toggle expanded class on the clicked session
                    sessionCard.classList.toggle('expanded');
                });

                // Handle edit icon click
                sessionHeader.querySelector('.edit-icon').addEventListener('click', function (event) {
                    event.stopPropagation(); // Prevent triggering the expand on click
                    const sessionId = this.getAttribute('data-session');
                    window.location.href = `editSession.html?session=${sessionId}`;
                });
            });
        })
        .catch(error => {
            console.error('Error fetching sessions:', error);
        });
});
