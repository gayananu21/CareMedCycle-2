fetch('http://localhost/WWW/ProfessionalStaf/php/get_patients.php')
.then(response => response.json())
.then(data => {
    const patientsGrid = document.getElementById('content');

    // Loop through each patient and create HTML structure
    data.forEach(patient => {
        // Create a div for the patient card
        const patientCard = document.createElement('div');
        patientCard.classList.add('card');

        const editContainer = document.createElement('div');
        editContainer.classList.add('container');
        editContainer.classList.add('edit');

        const editButton =  document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.id = 'editBtn';

        const icon = document.createElement('i');
        icon.classList.add('fa-solid')
        icon.classList.add('fa-pen-to-square')

        editButton.appendChild(icon);
        editContainer.appendChild(editButton)

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('container');

        const image = document.createElement('img');
        image.src = 'Images/user.jpg'
        image.classList.add('image');

        imageContainer.appendChild(image);

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('container')

        const name = document.createElement('span');
        name.classList.add('name')
        name.innerHTML = patient.name

        // const gender = document.createElement('span');
        // name.classList.add('gender')
        // gender.innerHTML

        nameContainer.appendChild(name)
        // nameContainer.appendChild(gender)

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('container');

        const age = document.createElement('p');
        age.classList.add('details')
        age.textContent = `Age ${patient.age}`;

        // const height = document.createElement('p');
        // height.classList.add('details')
        // height.textContent = patient.height

        const weight = document.createElement('p');
        weight.classList.add('details')
        weight.textContent = `Weight ${patient.weight}`

        detailsContainer.appendChild(age);
        detailsContainer.appendChild(weight);

        
        patientCard.appendChild(editContainer)
        patientCard.appendChild(imageContainer)
        patientCard.appendChild(nameContainer)
        patientCard.appendChild(detailsContainer)
        patientsGrid.appendChild(patientCard)


        // Add click event to go to patient details
        // editButton.onclick = function() {
        //     window.location.href = patient_details.html?id=${patient.id};
        // };

        // Create an img element for the patient's profile picture
        // const patientImg = document.createElement('img');
        // patientImg.src = patient.profile_image || 'Images/default-avatar.png';  // Default image if not available
        // patientImg.alt = ${patient.name}'s profile picture;
        // patientImg.classList.add('patient-avatar');  // Add class for styling

        // // Add patient name
        // const patientName = document.createElement('h3');
        // patientName.textContent = patient.name;

        // // Append the image and name to the card
        // patientCard.appendChild(patientImg);
        // patientCard.appendChild(patientName);

        // // Append the card to the grid
        // patientsGrid.appendChild(patientCard);
    });
})
.catch(error => {
    console.error('Error fetching the patient data:', error);
});