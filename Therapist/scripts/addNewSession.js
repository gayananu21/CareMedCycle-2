document.addEventListener('DOMContentLoaded', () => {
    let draggedPatient = null;

    // Fetch available patients from the database and populate the available patients section
    fetch('http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/get_patients.php')
        .then(response => response.json())
        .then(patients => {
            const availablePatients = document.querySelector('#available-patients');
            availablePatients.innerHTML = '';

            patients.forEach(patient => {
                const patientDiv = document.createElement('div');
                patientDiv.classList.add('patient');
                patientDiv.setAttribute('draggable', 'true');
                patientDiv.setAttribute('data-id', patient.id);
                patientDiv.innerHTML = `
                    <i class="fas fa-plus-circle add-icon"></i>
                    <img src="${patient.profile_image}" alt="${patient.name}">
                    <span>${patient.name}</span>
                `;
                availablePatients.appendChild(patientDiv);

                // Set up drag event and click event for each patient
                patientDiv.addEventListener('dragstart', (e) => {
                    draggedPatient = e.target;
                    draggedPatient.classList.add('dragging');
                });

                patientDiv.addEventListener('dragend', (e) => {
                    draggedPatient.classList.remove('dragging');
                    draggedPatient = null;
                });

                patientDiv.querySelector('.add-icon').addEventListener('click', () => {
                    addPatientToSelected(patientDiv);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching patients:', error);
        });

    // Function to add a patient to the selected patients area
    function addPatientToSelected(patientElement) {
        const clonedPatient = patientElement.cloneNode(true);
        clonedPatient.querySelector('.add-icon').remove();

        const removeIcon = document.createElement('i');
        removeIcon.classList.add('fas', 'fa-minus-circle', 'remove-icon');
        clonedPatient.appendChild(removeIcon);

        const selectedPatients = document.querySelector('#selected-patients');
        selectedPatients.appendChild(clonedPatient);

        patientElement.remove();

        removeIcon.addEventListener('click', () => {
            selectedPatients.removeChild(clonedPatient);
            addPatientToAvailable(clonedPatient);
        });
    }

    // Function to add a patient back to the available list
    function addPatientToAvailable(patientElement) {
        const clonedPatient = patientElement.cloneNode(true);
        clonedPatient.querySelector('.remove-icon').remove();

        const addIcon = document.createElement('i');
        addIcon.classList.add('fas', 'fa-plus-circle', 'add-icon');
        clonedPatient.appendChild(addIcon);

        const availablePatients = document.querySelector('#available-patients');
        availablePatients.appendChild(clonedPatient);

        clonedPatient.addEventListener('dragstart', (e) => {
            draggedPatient = e.target;
            draggedPatient.classList.add('dragging');
        });

        clonedPatient.addEventListener('dragend', (e) => {
            draggedPatient.classList.remove('dragging');
            draggedPatient = null;
        });

        addIcon.addEventListener('click', () => {
            addPatientToSelected(clonedPatient);
        });
    }

    // Drag and drop functionality for selected patients
    const selectedPatients = document.querySelector('#selected-patients');
    selectedPatients.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    selectedPatients.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedPatient) {
            addPatientToSelected(draggedPatient);
        }
    });

    // Save button logic
    const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Collect form data
        const sessionData = {
            title: document.querySelector('#title').value,
            date: document.querySelector('#date').value,
            time_start: document.querySelector('#time-start').value,
            time_end: document.querySelector('#time-end').value,
            location: document.querySelector('#location').value,
            patients: Array.from(document.querySelectorAll('#selected-patients .patient')).map(patient => patient.getAttribute('data-id'))
        };

        if (!sessionData.title || !sessionData.date || !sessionData.time_start || !sessionData.time_end || !sessionData.location || sessionData.patients.length === 0) {
            alert('Please fill all fields and add at least one patient.');
            return;
        }

        // Send the data to the backend to save in the database
        fetch('http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/add_session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Session created successfully!');
                window.location.href = 'upcomingSessions.html'; // Redirect to upcoming sessions
            } else {
                alert(`Error creating session: ${result.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating session. Please try again.');
        });
    });

    // Cancel button logic
    const cancelButton = document.querySelector('.cancel-btn');
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmCancel = confirm('Do you want to cancel creating this session?');
        if (confirmCancel) {
            window.location.href = 'therapist_home.html'; // Redirect to home
        }
    });
});
