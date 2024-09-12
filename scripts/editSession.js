document.addEventListener('DOMContentLoaded', () => {
    let draggedPatient = null;

    // Function to add a patient to the selected patients area
    function addPatientToSelected(patientElement) {
        // Clone patient and remove the "+" icon
        const clonedPatient = patientElement.cloneNode(true);
        clonedPatient.querySelector('.add-icon').remove();

        // Add a remove icon instead
        const removeIcon = document.createElement('i');
        removeIcon.classList.add('fas', 'fa-minus-circle', 'remove-icon');
        clonedPatient.appendChild(removeIcon);

        // Add cloned patient to the selected patients area
        const selectedPatients = document.querySelector('#selected-patients');
        selectedPatients.appendChild(clonedPatient);

        // Remove the patient from the available list
        patientElement.remove();

        // Add event listener to remove the patient from selected list
        removeIcon.addEventListener('click', () => {
            selectedPatients.removeChild(clonedPatient);
            addPatientToAvailable(clonedPatient); // Re-add to the available list
        });
    }

    // Function to add a patient back to the available list
    function addPatientToAvailable(patientElement) {
        // Clone patient and remove the "-" icon
        const clonedPatient = patientElement.cloneNode(true);
        clonedPatient.querySelector('.remove-icon').remove();

        // Add the "+" icon back
        const addIcon = document.createElement('i');
        addIcon.classList.add('fas', 'fa-plus-circle', 'add-icon');
        clonedPatient.appendChild(addIcon);

        // Add cloned patient back to the available patients area
        const availablePatients = document.querySelector('#available-patients');
        availablePatients.appendChild(clonedPatient);

        // Re-add event listeners for drag and click on the newly added patient
        clonedPatient.addEventListener('dragstart', (e) => {
            draggedPatient = e.target;
            draggedPatient.classList.add('dragging');
        });

        clonedPatient.addEventListener('dragend', (e) => {
            draggedPatient.classList.remove('dragging');
            draggedPatient = null;
        });

        // Re-add event listener for the "+" icon
        addIcon.addEventListener('click', () => {
            addPatientToSelected(clonedPatient);
        });
    }

    // Make available patients draggable
    document.querySelectorAll('.available-patients .patient').forEach(patient => {
        // Drag start event
        patient.addEventListener('dragstart', (e) => {
            draggedPatient = e.target;
            draggedPatient.classList.add('dragging');
        });

        // Drag end event
        patient.addEventListener('dragend', (e) => {
            draggedPatient.classList.remove('dragging');
            draggedPatient = null;
        });

        // Click event for the "+" icon
        patient.querySelector('.add-icon').addEventListener('click', () => {
            addPatientToSelected(patient);
        });
    });

    // Make the selected patients area droppable
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
});
