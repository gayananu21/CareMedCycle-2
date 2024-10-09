document.addEventListener("DOMContentLoaded", () => {
  let draggedPatient = null;
  let draggedTherapist = null;
  fetch('http://localhost/WWW/ProfessionalStaf/php/get_patients.php')
        .then(response => response.json())
        .then(patients => {
            console.log(patients)
        })
        .catch(error => {
            console.error('Error fetching patients:', error);
        });

  // Function to add a patient to the selected patients area
  function addPatientToSelected(patientElement) {
      const clonedPatient = patientElement.cloneNode(true);
      clonedPatient.querySelector(".add-icon-patient").remove();

      const removeIcon = document.createElement("i");
      removeIcon.classList.add("fas", "fa-minus-circle", "remove-icon-patient");
      clonedPatient.appendChild(removeIcon);

      const selectedPatients = document.querySelector("#selected-patients");
      selectedPatients.appendChild(clonedPatient);

      patientElement.remove();

      removeIcon.addEventListener("click", () => {
        selectedPatients.removeChild(clonedPatient);
        addPatientToAvailable(clonedPatient);
      });
  
  }

  function addTherapistToSelected(therapistElement) {
      const clonedTherapist = therapistElement.cloneNode(true);
      clonedTherapist.querySelector('.add-icon-therapist').remove();

      const removeIconTherapist = document.createElement('i');
      removeIconTherapist.classList.add('fas', 'fa-minus-circle', 'remove-icon-therapist');
      clonedTherapist.appendChild(removeIconTherapist);

      const selectedTherapists = document.querySelector('#selected-therapists');
      selectedTherapists.appendChild(clonedTherapist);

      therapistElement.remove();

      removeIconTherapist.addEventListener('click', () => {
          selectedTherapists.removeChild(clonedTherapist);
          addTherapistToAvailable(clonedTherapist);
      });
  }

  // Function to add a patient back to the available list
  function addPatientToAvailable(patientElement) {
    const clonedPatient = patientElement.cloneNode(true);
    clonedPatient.querySelector(".remove-icon-patient").remove();

    const addIcon = document.createElement("i");
    addIcon.classList.add("fas", "fa-plus-circle", "add-icon-patient");
    clonedPatient.appendChild(addIcon);

    const availablePatients = document.querySelector("#available-patients");
    availablePatients.appendChild(clonedPatient);

    clonedPatient.addEventListener("dragstart", (e) => {
      draggedPatient = e.target;
      draggedPatient.classList.add("dragging");
    });

    clonedPatient.addEventListener("dragend", (e) => {
      draggedPatient.classList.remove("dragging");
      draggedPatient = null;
    });

    addIcon.addEventListener("click", () => {
      addPatientToSelected(clonedPatient);
    });
  }

  function addTherapistToAvailable(therapistElement) {
      const clonedTherapist = therapistElement.cloneNode(true);
      clonedTherapist.querySelector('.remove-icon-therapist').remove();

      const addIconTherapist = document.createElement('i');
      addIconTherapist.classList.add('fas', 'fa-plus-circle', 'add-icon-therapist');
      clonedTherapist.appendChild(addIconTherapist);

      const availablePatients = document.querySelector('#available-therapists');
      availablePatients.appendChild(clonedTherapist);

      clonedTherapist.addEventListener('dragstart', (e) => {
          draggedTherapist = e.target;
          draggedTherapist.classList.add('dragging');
      });

      clonedTherapist.addEventListener('dragend', (e) => {
          draggedTherapist.classList.remove('dragging');
          draggedTherapist = null;
      });

      addIconTherapist.addEventListener('click', () => {
          addTherapistToSelected(clonedTherapist);
      });
  }

  // Initial setup for drag events and click to add
  document.querySelectorAll(".available-patients .patient").forEach((patient) => {
    patient.addEventListener("dragstart", (e) => {
      draggedPatient = e.target;
      draggedPatient.classList.add("dragging");
    });

    patient.addEventListener("dragend", (e) => {
      draggedPatient.classList.remove("dragging");
      draggedPatient = null;
    });

    patient.querySelector(".add-icon-patient").addEventListener("click", () => {
      addPatientToSelected(patient);
    });
  });

  document.querySelectorAll(".available-therapists .therapist").forEach((patient) => {
    patient.addEventListener("dragstart", (e) => {
      draggedTherapist = e.target;
      draggedTherapist.classList.add("dragging");
    });

    patient.addEventListener("dragend", (e) => {
      draggedTherapist.classList.remove("dragging");
      draggedTherapist = null;
    });

    patient.querySelector(".add-icon-therapist").addEventListener("click", () => {
      addTherapistToSelected(patient);
    });
  });

  // Removed the preselecting block
  // This block is intentionally commented out to avoid preselecting patients
  /*
    const availablePatients = document.querySelectorAll('.available-patients .patient');
    for (let i = 0; i < 3; i++) {
        addPatientToSelected(availablePatients[i]);
    }
    */

  // Drag and drop functionality
  const selectedPatients = document.querySelector("#selected-patients");
  const selectedTherapists = document.querySelector("#selected-therapists");

  selectedPatients.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  selectedPatients.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedPatient) {
      addPatientToSelected(draggedPatient);
    }
  });

  selectedTherapists.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  selectedTherapists.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedTherapist) {
      addTherapistToSelected(draggedTherapist);
    }
  });

  // Save button with confirmation and alert bar navigation
  const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Collect form data
        const sessionData = {
            title: document.querySelector('#title').value,
            date: document.querySelector('#date').value,
            time_start: document.querySelector('#time-start').value,
            time_end: document.querySelector('#time-end').value,
            location: document.querySelector('#location').value,
            patients: Array.from(document.querySelectorAll('#selected-patients .patient')).map(patient => patient.getAttribute('data-id')),
            therapists: Array.from(document.querySelectorAll('#selected-therapists .therapist')).map(therapist => therapist.getAttribute('data-id'))
        };

        if (!sessionData.title || !sessionData.date || !sessionData.time_start || !sessionData.time_end || !sessionData.location || sessionData.patients.length === 0) {
            alert('Please fill all fields and add at least one patient.');
            return;
        }

        // Send the data to the backend to save in the database
        fetch('http://localhost/WWW/ProfessionalStaf/php/add_session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Session created successfully!');
                window.location.href = 'upcomingSessions.html'; // Redirect to upcoming sessions
            } else {
                alert(`Error creating session: ${result.message}` );
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating session. Please try again.');
        });
    });

    // Cancel button logic
    const cancelButton = document.querySelector('.cancel-btn');
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        const confirmCancel = confirm('Do you want to cancel creating this session?');
        if (confirmCancel) {
            window.location.href = 'therapist_home.html'; // Redirect to home
        }
    });
});

