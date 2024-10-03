document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('noteId');  // Get the note ID from URL
    const patientId = urlParams.get('patientId');  // Get the patient ID from URL

    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');
    const errorMessage = document.getElementById('error-message');
    const successCloseBtn = document.getElementById('success-close-btn');
    const errorCloseBtn = document.getElementById('error-close-btn');

    // Show custom note type input if "Other" is selected
    const noteTypeSelect = document.getElementById('note-type');
    const customNoteTypeField = document.querySelector('.custom-note-type');
    const customNoteTypeInput = document.getElementById('custom-note-type-input');

    // Show/hide custom note type field
    noteTypeSelect.addEventListener('change', function() {
        if (noteTypeSelect.value === 'Other') {
            customNoteTypeField.style.display = 'block';
        } else {
            customNoteTypeField.style.display = 'none';
        }
    });

    if (!noteId || !patientId) {
        alert('Missing required parameters in the URL.');
        return;
    }

    // Fetch note details
    fetch(`http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/get_note_details.php?noteId=${noteId}`)
        .then(response => response.json())
        .then(data => {
            // Set the form fields with existing note data
            document.getElementById('date').value = data.date;
            document.getElementById('note').value = data.note;
            document.getElementById('note-type').value = data.note_type;

            // Show custom note type input if "Other" was selected
            if (data.note_type === 'Other') {
                customNoteTypeField.style.display = 'block';
                customNoteTypeInput.value = data.custom_note_type || '';  // Set the value of custom note type if it exists
            }
        })
        .catch(error => {
            console.error('Error fetching note details:', error);
        });

    // Handle form submission to update the note
    document.getElementById('edit-note-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent default form submission

        const noteData = {
            noteId: noteId,
            patientId: patientId,
            date: document.getElementById('date').value,
            note: document.getElementById('note').value,
            note_type: noteTypeSelect.value,
            custom_note_type: noteTypeSelect.value === 'Other' ? customNoteTypeInput.value : null
        };

        // Ensure no empty fields are submitted
        if (!noteData.date || !noteData.note || !noteData.note_type || (noteData.note_type === 'Other' && !noteData.custom_note_type)) {
            alert('Please fill in all required fields.');
            return;
        }

        // Send the updated note data to the server for updating in the database
        fetch('http://localhost/www/cycle-2/CareMedCycle-2/Therapist/php/update_note.php', {
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
                errorMessage.textContent = `Error updating note: ${result.message}`;
                errorPopup.classList.remove('hidden'); // Show error popup
                errorPopup.classList.add('show');
            }
        })
        .catch(error => {
            errorMessage.textContent = 'Error updating note. Please try again later.';
            errorPopup.classList.remove('hidden'); // Show error popup
            errorPopup.classList.add('show');
            console.error('Error:', error);
        });
    });

    // Close success popup
    successCloseBtn.addEventListener('click', () => {
        successPopup.classList.add('hidden');
        window.location.href = `patient_details.html?id=${patientId}`; // Redirect back to patient details
    });

    // Close error popup
    errorCloseBtn.addEventListener('click', () => {
        errorPopup.classList.add('hidden');
    });
});
