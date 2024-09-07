// Function to load patient data and populate HTML
function loadPatients() {
    fetch('jsonFiles/patientRecords.json')
        .then(response => response.json())
        .then(data => {
            const patientsContainer = document.getElementById('patients-container');
            patientsContainer.innerHTML = ''; // Clear previous content

            // Loop through each patient in the JSON data
            data.patients.forEach(patient => {
                // Create a container for each patient
                const patientContainer = document.createElement('div');
                patientContainer.classList.add('container');

                // Add patient details
                patientContainer.innerHTML = `
                    <div class="header">
                        <img src="${patient.avatar}" alt="Patient Avatar">
                        <h2>${patient.name}</h2>
                    </div>
                    <div class="patient-details">
                        <h3>Patient Details</h3>
                        <div>Eating Habits: ${patient.details.eatingHabits}</div>
                        <div>Sleeping Schedule: ${patient.details.sleepingSchedule}</div>
                        <div>Weight: ${patient.details.weight}</div>
                        <div>State of Mind: ${patient.details.stateOfMind}</div>
                        <div>Other: ${patient.details.other}</div>
                    </div>
                    <div class="patient-notes">
                        <h3>Patient Notes <span class="add-note-button">➕</span></h3>
                        <div class="notes-container" id="notes-${patient.name.replace(/\s/g, '')}"></div>
                    </div>
                `;

                // Append the patient container to the main patients container
                patientsContainer.appendChild(patientContainer);

                // Add patient notes
                const notesContainer = document.getElementById(`notes-${patient.name.replace(/\s/g, '')}`);
                patient.notes.forEach(note => {
                    const noteCard = document.createElement('div');
                    noteCard.classList.add('note-card');
                    noteCard.innerHTML = `
                        <div class="edit-icon">✏️</div>
                        <p><strong>Date:</strong> ${note.date}</p>
                        <p><strong>Note:</strong> ${note.note}</p>
                        <p><strong>Patient Type:</strong> ${note.type}</p>
                    `;
                    notesContainer.appendChild(noteCard);
                });
            });
        })
        .catch(error => console.error('Error loading patient data:', error));
}

// Call the function to load patients
loadPatients();
