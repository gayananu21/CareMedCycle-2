// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    // Number of Patients per Therapist
    var ctx = document.getElementById('patientsChart').getContext('2d');
    var patientsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Therapist A', 'Therapist B', 'Therapist C'],
            datasets: [{
                label: 'Number of Patients',
                data: [80, 50, 70],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        }
    });

    // Case Types Handled by Therapists
    var ctx2 = document.getElementById('caseTypesChart').getContext('2d');
    var caseTypesChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['CBT', 'Family Therapy', 'Psychodynamic Therapy'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        }
    });

    // Consultation Duration per Therapist
    var ctx3 = document.getElementById('consultationChart').getContext('2d');
    var consultationChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ['Therapist A', 'Therapist B', 'Therapist C'],
            datasets: [{
                label: 'Consultation Duration (minutes)',
                data: [45, 50, 35],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Example: Fetching therapist data
    const therapists = [
        { name: "Therapist A", patients: 80, cases: "CBT, Family Therapy", duration: "45 minutes" },
        { name: "Therapist B", patients: 50, cases: "Psychodynamic Therapy", duration: "50 minutes" },
        { name: "Therapist C", patients: 70, cases: "CBT", duration: "35 minutes" }
    ];

    const overviewTableBody = document.querySelector("#therapistOverview tbody");
    therapists.forEach(therapist => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${therapist.name}</td>
            <td>${therapist.patients}</td>
            <td>${therapist.cases}</td>
            <td>${therapist.duration}</td>
        `;
        overviewTableBody.appendChild(row);
    });
});
