document.addEventListener('DOMContentLoaded', function() {
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
                // Get DOM elements for patient details
                const patientAvatar = document.getElementById('patient-avatar');
                const patientName = document.getElementById('patient-name');
                const eatingHabits = document.getElementById('eating-habits');
                const sleepingSchedule = document.getElementById('sleeping-schedule');
                const weight = document.getElementById('weight');
                const stateOfMind = document.getElementById('state-of-mind');
                const otherInfo = document.getElementById('other-info');

                // Set the patient details in the HTML
                if (patientAvatar) patientAvatar.src = patient.avatar;
                if (patientName) patientName.textContent = patient.name;
                if (eatingHabits) eatingHabits.textContent = patient.details.eatingHabits;
                if (sleepingSchedule) sleepingSchedule.textContent = patient.details.sleepingSchedule;
                if (weight) weight.textContent = patient.details.weight;
                if (stateOfMind) stateOfMind.textContent = patient.details.stateOfMind;
                if (otherInfo) otherInfo.textContent = patient.details.other;

                // Handle Patient Notes
                const notesGrid = document.getElementById('notes-grid');
                if (notesGrid) {
                    notesGrid.innerHTML = ''; // Clear existing notes

                    // Loop through and render each note
                    patient.notes.forEach(note => {
                        const noteCard = document.createElement('div');
                        noteCard.classList.add('note-card');

                        noteCard.innerHTML = `
                            <div class="note-header">
                                <i class="edit-icon fas fa-pencil-alt"></i>
                            </div>
                            <p><strong><i class="icon fa fa-calendar-alt"></i> Date:</strong> ${note.date}</p>
                            <p><strong><i class="icon fa fa-sticky-note"></i> Note:</strong></p>
                            <p>${note.note}</p>
                            <p><strong><i class="icon fa fa-notes-medical"></i> Patient Type:</strong> ${note.type}</p>
                        `;

                        notesGrid.appendChild(noteCard);
                    });
                }
            } else {
                // Handle case where patient is not found
                document.querySelector('.patient-details-container').innerHTML = '<p>Patient not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the patient data:', error);
            document.querySelector('.patient-details-container').innerHTML = '<p>Error loading patient data. Please try again later.</p>';
        });
});
