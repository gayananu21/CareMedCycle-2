document.addEventListener('DOMContentLoaded', function() {
    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the patient ID from the URL
    const patientId = getQueryParam('id');

    // Fetch the patient data from the PHP backend
    fetch(`http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/get_patient_details.php?id=${patientId}`)
        .then(response => response.json())
        .then(data => {
            const patient = data.patient;
            const notes = data.notes;

            // Get DOM elements for patient details
            const patientAvatar = document.getElementById('patient-avatar');
            const patientName = document.getElementById('patient-name');
            const eatingHabits = document.getElementById('eating-habits');
            const sleepingSchedule = document.getElementById('sleeping-schedule');
            const weight = document.getElementById('weight');
            const stateOfMind = document.getElementById('state-of-mind');
            const otherInfo = document.getElementById('other-info');

            // Set the patient details in the HTML
            if (patientAvatar) patientAvatar.src = patient.profile_image || 'Images/default-avatar.png';
            if (patientName) patientName.textContent = patient.name;
            if (eatingHabits) eatingHabits.textContent = patient.eating_habits;
            if (sleepingSchedule) sleepingSchedule.textContent = patient.sleeping_schedule;
            if (weight) weight.textContent = `${patient.weight} KG`;
            if (stateOfMind) stateOfMind.textContent = patient.state_of_mind;
            if (otherInfo) otherInfo.textContent = patient.other_issues;

            // Handle Patient Notes
            const notesGrid = document.getElementById('notes-grid');
            if (notesGrid) {
                notesGrid.innerHTML = ''; // Clear existing notes

                // Loop through and render each note
                notes.forEach(note => {
                    const noteCard = document.createElement('div');
                    noteCard.classList.add('note-card');

                    noteCard.innerHTML = `
                        <p><strong>Date:</strong> ${note.date}</p>
                        <p><strong>Note:</strong> ${note.note}</p>
                        <p><strong>Type:</strong> ${note.note_type}</p>
                    `;

                    notesGrid.appendChild(noteCard);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching the patient data:', error);
            document.querySelector('.patient-details-container').innerHTML = '<p>Error loading patient data. Please try again later.</p>';
        });
});
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id'); // Get the patient ID from URL

    const addNoteLink = document.querySelector('.add-note-link');
    if (addNoteLink && patientId) {
        // Set the href attribute dynamically to include the patient ID in the URL
        addNoteLink.href = `addNewNote.html?patient_id=${patientId}`;
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const patientId = new URLSearchParams(window.location.search).get('id'); // Get patient ID from URL

    fetch(`http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/get_patient_details.php?id=${patientId}`)
        .then(response => response.json())
        .then(data => {
            const notesGrid = document.getElementById('notes-grid');
            if (notesGrid) {
                notesGrid.innerHTML = ''; // Clear existing notes

                // Loop through and render each note with a pencil (edit) icon
                data.notes.forEach(note => {
                    const noteCard = document.createElement('div');
                    noteCard.classList.add('note-card');

                    noteCard.innerHTML = `
                    <div class="note-header">
                        <p><strong>Date:</strong> ${note.date}</p>
                        <i class="edit-icon fas fa-pencil-alt" data-note-id="${note.note_id}" data-patient-id="${patientId}"></i>
                    </div>
                    <p><strong>Note:</strong> ${note.note}</p>
                    <p><strong>Type:</strong> ${note.note_type}</p>
                `;

                    notesGrid.appendChild(noteCard);
                });

                // Add click event listeners to all pencil icons for editing
                document.querySelectorAll('.edit-icon').forEach(icon => {
                    icon.addEventListener('click', function() {
                        const noteId = this.getAttribute('data-note-id');
                        window.location.href = `editNote.html?noteId=${noteId}&patientId=${patientId}`;
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error fetching the patient data:', error);
            document.querySelector('.patient-details-container').innerHTML = '<p>Error loading patient data. Please try again later.</p>';
        });
});
