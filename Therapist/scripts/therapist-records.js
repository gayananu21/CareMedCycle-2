// Fetch the patient data from JSON file
fetch('jsonfiles/therapist_records.json')
    .then(response => response.json())
    .then(data => {
        const patientsGrid = document.getElementById('patients-grid');

        // Loop through each patient and create HTML structure
        data.patients.forEach(patient => {
            // Create a div for the patient card
            const patientCard = document.createElement('div');
            patientCard.classList.add('patient-card');

            // Add patient image
            const patientImg = document.createElement('img');
            patientImg.src = patient.avatar;
            patientImg.alt = patient.name;

            // Add patient name
            const patientName = document.createElement('h3');
            patientName.textContent = patient.name;

            // Append image and name to the card
            patientCard.appendChild(patientImg);
            patientCard.appendChild(patientName);

            // Append the patient card directly to the grid (without a link)
            patientsGrid.appendChild(patientCard);
        });
    })
    .catch(error => {
        console.error('Error fetching the patient data:', error);
    });
