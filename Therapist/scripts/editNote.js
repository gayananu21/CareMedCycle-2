document.addEventListener('DOMContentLoaded', () => {
    // Elements for popups
    const cancelPopup = document.getElementById('cancel-popup');
    const confirmationPopup = document.getElementById('confirmation-popup');
    const successPopup = document.getElementById('success-popup');
    
    // Buttons
    const cancelBtn = document.querySelector('.cancel-btn');
    const saveBtn = document.querySelector('.save-btn');
    
    const cancelYesBtn = document.getElementById('cancel-yes-btn');
    const cancelNoBtn = document.getElementById('cancel-no-btn');
    const saveYesBtn = document.getElementById('save-yes-btn');
    const saveNoBtn = document.getElementById('save-no-btn');
    const closeSuccessBtn = document.getElementById('popup-close-btn');

    // Cancel button logic
    cancelBtn.addEventListener('click', () => {
        cancelPopup.classList.remove('hidden'); // Show the cancel confirmation popup
    });

    cancelYesBtn.addEventListener('click', () => {
        window.location.href = 'patient_records.html'; // Redirect to patient records page
    });

    cancelNoBtn.addEventListener('click', () => {
        cancelPopup.classList.add('hidden'); // Hide the cancel confirmation popup
    });

    // Save button logic
    saveBtn.addEventListener('click', () => {
        confirmationPopup.classList.remove('hidden'); // Show the save confirmation popup
    });

    saveYesBtn.addEventListener('click', () => {
        confirmationPopup.classList.add('hidden'); // Hide save popup
        successPopup.classList.remove('hidden');   // Show success popup

        // Simulate saving and then redirect to another page after a short delay
        setTimeout(() => {
            window.location.href = 'patient_records.html'; // Redirect to patient details page
        }, 2000);
    });

    saveNoBtn.addEventListener('click', () => {
        confirmationPopup.classList.add('hidden'); // Hide the save confirmation popup
    });

    closeSuccessBtn.addEventListener('click', () => {
        successPopup.classList.add('hidden'); // Close success popup manually
        window.location.href = 'patient_records.html'; // Redirect to patient details page
    });
});
