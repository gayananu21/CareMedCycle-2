document.addEventListener('DOMContentLoaded', () => {
    const patientTypeSelect = document.getElementById('patient-type');
    const customPatientTypeField = document.querySelector('.custom-patient-type');
    const form = document.getElementById('add-note-form');
    const saveButton = document.querySelector('.save-btn');
    const cancelButton = document.querySelector('.cancel-btn');
    const confirmationPopup = document.getElementById('confirmation-popup');
    const successPopup = document.getElementById('success-popup');
    const yesButton = document.getElementById('yes-btn');
    const noButton = document.getElementById('no-btn');
    const closeButton = document.getElementById('popup-close-btn');

    // Show custom patient type input when "Other" is selected
    patientTypeSelect.addEventListener('change', () => {
        if (patientTypeSelect.value === 'Other') {
            customPatientTypeField.style.display = 'block';
        } else {
            customPatientTypeField.style.display = 'none';
        }
    });

    // Cancel button event
    cancelButton.addEventListener('click', (e) => {
        const confirmCancel = confirm('Do you want to skip adding a new note?');
        if (confirmCancel) {
            window.location.href = 'patient_records.html'; // Redirect to patient records page
        }
    });

    // Save button (shows confirmation popup)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        confirmationPopup.classList.remove('hidden'); // Show confirmation popup
    });

    // Yes button in confirmation popup
    yesButton.addEventListener('click', () => {
        confirmationPopup.classList.add('hidden');
        successPopup.classList.remove('hidden'); // Show success message

        // Simulate success and redirect to patient records after a delay
        setTimeout(() => {
            successPopup.classList.add('hidden');
            window.location.href = 'patient_records.html'; // Redirect to patient records page
        }, 1500); // Delay for 1.5 seconds
    });

    // No button in confirmation popup
    noButton.addEventListener('click', () => {
        confirmationPopup.classList.add('hidden'); // Close confirmation popup
    });

    // Close the success popup
    closeButton.addEventListener('click', () => {
        successPopup.classList.add('hidden');
        window.location.href = 'patient_records.html';
    });
});
