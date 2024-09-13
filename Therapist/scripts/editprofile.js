document.addEventListener('DOMContentLoaded', function() {
    // Handle save button action
    const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        const confirmSave = confirm('Do you want to save the changes?');
        if (confirmSave) {
            alert('Profile updated successfully!');
            window.location.href = 'therapist_home.html'; // Redirect to therapist home page
        }
    });

    // Handle cancel button action
    const cancelButton = document.querySelector('.cancel-btn');
    cancelButton.addEventListener('click', function(e) {
        e.preventDefault();
        const confirmCancel = confirm('Do you want to discard changes?');
        if (confirmCancel) {
            window.location.href = 'therapist_home.html'; // Redirect to therapist home page
        }
    });
});
