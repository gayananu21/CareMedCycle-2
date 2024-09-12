document.addEventListener('DOMContentLoaded', () => {
    // Select all patient cards
    const patientCards = document.querySelectorAll('.patient-card');

    // Add click event listener to each patient card
    patientCards.forEach(card => {
        card.addEventListener('click', () => {
            const patientId = card.getAttribute('data-id');
            // Redirect to patient_details.html with the patient ID as a query parameter
            window.location.href = `patient_details.html?id=${patientId}`;
        });
    });
});
