document.addEventListener('DOMContentLoaded', () => {
    let draggedPatient = null;

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

    // Initial setup for drag events and click to add
    document.querySelectorAll('.available-patients .patient').forEach(patient => {
        patient.addEventListener('dragstart', (e) => {
            draggedPatient = e.target;
            draggedPatient.classList.add('dragging');
        });

        patient.addEventListener('dragend', (e) => {
            draggedPatient.classList.remove('dragging');
            draggedPatient = null;
        });

        patient.querySelector('.add-icon').addEventListener('click', () => {
            addPatientToSelected(patient);
        });
    });

    // Removed the preselecting block
    // This block is intentionally commented out to avoid preselecting patients
    /*
    const availablePatients = document.querySelectorAll('.available-patients .patient');
    for (let i = 0; i < 3; i++) {
        addPatientToSelected(availablePatients[i]);
    }
    */

    // Drag and drop functionality
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

    // Save button with confirmation and alert bar navigation
    const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmSave = confirm('Do you want to save changes?');
        if (confirmSave) {
            alert('Session created successfully!');
            window.location.href = 'upcomingSessions.html'; // Redirect to upcoming sessions
        }
    });
});
// Popup elements
const savePopup = document.getElementById('save-session');
const cancelPopup = document.getElementById('cancel-btn');

// Save button click -> Show save confirmation popup
const saveButton = document.getElementById('save-session');
saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    savePopup.classList.remove('hidden'); // Show popup
});

// Cancel button click -> Show cancel confirmation popup
const cancelButton = document.getElementById('cancel-session');
cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    cancelPopup.classList.remove('hidden'); // Show popup
});

// Popup actions for saving
document.getElementById('save-no-btn').addEventListener('click', () => {
    savePopup.classList.add('hidden');
});

document.getElementById('save-yes-btn').addEventListener('click', () => {
    alert('Session saved successfully!');
    window.location.href = 'upcomingSessions.html'; // Redirect to upcoming sessions
});

// Popup actions for canceling
document.getElementById('cancel-no-btn').addEventListener('click', () => {
    cancelPopup.classList.add('hidden');
});

document.getElementById('cancel-yes-btn').addEventListener('click', () => {
    window.location.href = 'therapist_home.html'; // Redirect to therapist home
});
