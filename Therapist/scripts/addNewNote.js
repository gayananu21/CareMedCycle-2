document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patient_id'); // Get patient_id from the URL

    if (!patientId) {
        console.error('No patient ID found in URL.');
        return;
    }

    const addNoteForm = document.getElementById('add-note-form');
    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');
    const errorMessage = document.getElementById('error-message');
    const successCloseBtn = document.getElementById('success-close-btn');
    const errorCloseBtn = document.getElementById('error-close-btn');

    // Event listener for closing the popups
    successCloseBtn.addEventListener('click', () => {
        successPopup.classList.add('hidden');
        window.location.href = `patient_details.html?id=${patientId}`; // Redirect back to patient details
    });

    errorCloseBtn.addEventListener('click', () => {
        errorPopup.classList.add('hidden');
    });

    addNoteForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const noteData = {
            date: document.getElementById('date').value,
            note: document.getElementById('note').value,
            patient_type: document.getElementById('patient-type').value,
            patient_id: patientId // Include patient ID
        };

        fetch('http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/add_note.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                successPopup.classList.remove('hidden'); // Show success popup
                successPopup.classList.add('show');
            } else {
                errorMessage.textContent = `Error adding note: ${result.message}`;
                errorPopup.classList.remove('hidden'); // Show error popup
                errorPopup.classList.add('show');
            }
        })
        .catch(error => {
            errorMessage.textContent = 'Error adding note. Please try again later.';
            errorPopup.classList.remove('hidden'); // Show error popup
            errorPopup.classList.add('show');
            console.error('Error:', error);
        });
    });
});
