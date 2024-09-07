// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the patient ID from the URL
const patientId = getQueryParam('id');

// Fetch the patient data from the JSON file
fetch('jsonFiles/patient_records.json')
    .then(response => response.json())
    .then(data => {
        // Find the patient by ID
        const patient = data.patients.find(p => p.id == patientId);

        if (patient) {
            const patientDetailsDiv = document.getElementById('patient-details');

            // Create patient details HTML
            const patientHTML = `
                <div class="patient-profile">
                    <img src="${patient.avatar}" alt="${patient.name}">
                    <h1>${patient.name}</h1>
                </div>
                <div class="patient-info">
                    <h2>Patient Details</h2>
                    <p><strong>Eating Habits:</strong> ${patient.details.eatingHabits}</p>
                    <p><strong>Sleeping Schedule:</strong> ${patient.details.sleepingSchedule}</p>
                    <p><strong>Weight:</strong> ${patient.details.weight}</p>
                    <p><strong>State of Mind:</strong> ${patient.details.stateOfMind}</p>
                    <p><strong>Other:</strong> ${patient.details.other}</p>
                </div>
                <div class="patient-notes">
                    <h2>Patient Notes</h2>
                    ${patient.notes.map(note => `
                        <div class="note-card">
                            <p><strong>Date:</strong> ${note.date}</p>
                            <p><strong>Note:</strong> ${note.note}</p>
                            <p><strong>Patient Type:</strong> ${note.type}</p>
                        </div>
                    `).join('')}
                </div>
            `;

            // Insert the HTML into the patient details div
            patientDetailsDiv.innerHTML = patientHTML;
        } else {
            // If patient not found
            document.getElementById('patient-details').innerHTML = '<p>Patient not found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching the patient data:', error);
    });
