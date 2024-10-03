document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session');

    // Fetch session details (this part remains the same as you have already)
    fetch(`http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/get_session_details.php?session_id=${sessionId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Populate form fields with session details
                document.getElementById('title').value = data.session.session_name;
                document.getElementById('date').value = data.session.session_date;
                document.getElementById('time-start').value = data.session.session_time_start.slice(0, 5);
                document.getElementById('time-end').value = data.session.session_time_end.slice(0, 5);
                document.getElementById('location').value = data.session.location;

                // Populate selected patients (this part remains the same)
                const selectedPatientsContainer = document.getElementById('selected-patients');
                selectedPatientsContainer.innerHTML = '';
                data.patients.forEach(patient => {
                    const patientElement = document.createElement('div');
                    patientElement.classList.add('patient');
                    patientElement.setAttribute('data-id', patient.id);
                    patientElement.innerHTML = `
                        <img src="${patient.profile_image}" alt="${patient.name}">
                        <span>${patient.name}</span>
                        <i class="fas fa-minus-circle remove-icon"></i>
                    `;
                    selectedPatientsContainer.appendChild(patientElement);

                    // Remove patient handler
                    patientElement.querySelector('.remove-icon').addEventListener('click', () => {
                        selectedPatientsContainer.removeChild(patientElement);
                        addPatientToAvailable(patient);
                    });
                });

                // Populate available patients
                const availablePatientsContainer = document.getElementById('available-patients');
                availablePatientsContainer.innerHTML = '';
                data.remaining_patients.forEach(patient => {
                    addPatientToAvailable(patient);
                });
            } else {
                showModalMessage('Error', `Error fetching session details: ${data.message}`);
            }
        })
        .catch(error => {
            showModalMessage('Error', 'Error fetching session data. Please try again later.');
        });

    // Function to add a patient to the available patients section
    function addPatientToAvailable(patient) {
        const availablePatientsContainer = document.getElementById('available-patients');
        const patientElement = document.createElement('div');
        patientElement.classList.add('patient');
        patientElement.setAttribute('data-id', patient.id);
        patientElement.innerHTML = `
            <img src="${patient.profile_image}" alt="${patient.name}">
            <span>${patient.name}</span>
            <i class="fas fa-plus-circle add-icon"></i>
        `;
        availablePatientsContainer.appendChild(patientElement);

        // Add patient to selected list
        patientElement.querySelector('.add-icon').addEventListener('click', () => {
            availablePatientsContainer.removeChild(patientElement);
            addPatientToSelected(patient);
        });
    }

    // Function to add a patient to the selected patients section
    function addPatientToSelected(patient) {
        const selectedPatientsContainer = document.getElementById('selected-patients');
        const patientElement = document.createElement('div');
        patientElement.classList.add('patient');
        patientElement.setAttribute('data-id', patient.id);
        patientElement.innerHTML = `
            <img src="${patient.profile_image}" alt="${patient.name}">
            <span>${patient.name}</span>
            <i class="fas fa-minus-circle remove-icon"></i>
        `;
        selectedPatientsContainer.appendChild(patientElement);

        // Remove patient handler
        patientElement.querySelector('.remove-icon').addEventListener('click', () => {
            selectedPatientsContainer.removeChild(patientElement);
            addPatientToAvailable(patient);
        });
    }

    // Save button click event with success modal
    const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();

        const updatedSession = {
            session_id: sessionId,
            session_name: document.getElementById('title').value,
            session_date: document.getElementById('date').value,
            session_time_start: document.getElementById('time-start').value,
            session_time_end: document.getElementById('time-end').value,
            location: document.getElementById('location').value,
            selected_patients: Array.from(document.querySelectorAll('#selected-patients .patient')).map(patient => patient.dataset.id)
        };

        fetch('http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/update_session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSession)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showModalMessage('Success', 'Session updated successfully!', () => {
                    window.location.href = 'upcomingSessions.html'; // Redirect after OK
                });
            } else {
                showModalMessage('Error', `Error updating session: ${result.message}`);
            }
        })
        .catch(error => {
            showModalMessage('Error', 'An error occurred while updating the session. Please try again later.');
        });
    });

    // Cancel button click event with OK/Cancel confirmation
    const cancelButton = document.querySelector('.cancel-btn');
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        showCancelConfirmation(); // Show confirmation modal
    });

    // Function to show the cancel confirmation modal
    function showCancelConfirmation() {
        const cancelModal = document.getElementById('cancel-confirmation-modal');
        cancelModal.classList.remove('hidden');

        // OK button inside the cancel confirmation modal
        const okButton = document.getElementById('cancel-ok-btn');
        okButton.onclick = function () {
            cancelModal.classList.add('hidden'); // Hide modal
            window.location.href = 'upcomingSessions.html'; // Redirect
        };

        // Cancel button inside the cancel confirmation modal
        const cancelBtn = document.getElementById('cancel-cancel-btn');
        cancelBtn.onclick = function () {
            cancelModal.classList.add('hidden'); // Hide modal, stay on page
        };
    }

    // Function to show a custom message modal for success/error messages
    function showModalMessage(title, message, callback) {
        const modal = document.getElementById('message-modal');
        const messageText = document.getElementById('message-text');
        messageText.textContent = message;

        modal.classList.remove('hidden'); // Show modal

        const modalOkButton = document.getElementById('modal-ok-btn');
        modalOkButton.onclick = function () {
            modal.classList.add('hidden'); // Hide modal
            if (callback) callback(); // Execute callback if provided
        };
    }
}
);
