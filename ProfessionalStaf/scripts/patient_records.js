// Fetch the patient data from JSON file
fetch('jsonfiles/patient_records.json')
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

            // Create a link to patient details using their unique ID
            const patientLink = document.createElement('a');
            patientLink.href = `patient_details.html?id=${patient.id}`;
            patientLink.appendChild(patientCard);

            // Append image and name to the card
            patientCard.appendChild(patientImg);
            patientCard.appendChild(patientName);

            // Append the link (wrapped card) to the grid
            patientsGrid.appendChild(patientLink);
        });
    })
    .catch(error => {
        console.error('Error fetching the patient data:', error);
    });
