<?php
include 'db.php'; // Include the database connection

// Initialize variables for storing data
$therapistNames = [];
$patientCounts = [];
$caseTypes = [];
$caseCounts = [];
$consultationNames = [];
$consultationDurations = [];

// Therapist Performance Query
$sqlTherapist = "SELECT therapist_name, number_of_patients FROM therapists";
$resultTherapist = $conn->query($sqlTherapist);

if ($resultTherapist && $resultTherapist->num_rows > 0) {
    while ($row = $resultTherapist->fetch_assoc()) {
        $therapistNames[] = $row['therapist_name'];
        $patientCounts[] = $row['number_of_patients'];
    }
} else {
    echo "No data available for therapist performance.";
}

// Case Types Query
$sqlCaseTypes = "SELECT type, count FROM case_types";
$resultCaseTypes = $conn->query($sqlCaseTypes);

if ($resultCaseTypes && $resultCaseTypes->num_rows > 0) {
    while ($row = $resultCaseTypes->fetch_assoc()) {
        $caseTypes[] = $row['type'];
        $caseCounts[] = $row['count'];
    }
} else {
    echo "No data available for case types.";
}

// Consultation Durations Query
$sqlConsultations = "SELECT therapist_name, duration FROM consultation_durations";
$resultConsultations = $conn->query($sqlConsultations);

if ($resultConsultations && $resultConsultations->num_rows > 0) {
    while ($row = $resultConsultations->fetch_assoc()) {
        $consultationNames[] = $row['therapist_name'];
        $consultationDurations[] = $row['duration'];
    }
} else {
    echo "No data available for consultation durations.";
}

// Close the database connection after all queries
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auditor Dashboard</title>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
            background-image: url(Images/2.png);
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        header h1, h2 {
            margin: 0;
            color: #333;
        }
        nav {
            background-color: #333;
            overflow: hidden;
        }
        nav a {
            float: left;
            display: block;
            color: white;
            text-align: center;
            padding: 14px 20px;
            text-decoration: none;
        }
        nav a:hover {
            background-color: #ddd;
            color: black;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .card {
            background-color: white;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .logout-button {
            background-color: #f44336; /* Red */
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            float: right;
            margin: 10px;
        }
        .logout-button:hover {
            background-color: #c62828; /* Darker Red */
        }
        .chart-container {
            margin-bottom: 40px;
            text-align: center;
        }
        canvas {
            max-width: 400px; /* Adjust canvas width */
            max-height: 300px; /* Adjust canvas height */
            margin: 0 auto;
        }
        @media (max-width: 768px) {
            canvas {
                max-width: 100%;
                max-height: 200px;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Auditor Dashboard</h1>
        <button class="logout-button" onclick="logout()">Logout</button>
    </header>

    <nav>
        <a href="home.php"><i class="fas fa-home"></i> Home</a>
        <a href="edit-info.php"><i class="fas fa-user-edit"></i> Edit Personal Info</a>
        <a href="therapist-overview.php"><i class="fas fa-user-md"></i> Therapist Overview</a>
        <a href="audit-logs.php"><i class="fas fa-file-alt"></i> Audit Logs</a>
    </nav>

    <div class="container">
        <!-- Therapist Performance Chart -->
        <div class="card chart-container">
            <h2>Therapist Performance</h2>
            <canvas id="therapistPerformanceChart"></canvas>
        </div>

        <!-- Case Types Chart -->
        <div class="card chart-container">
            <h2>Case Types</h2>
            <canvas id="caseTypesChart"></canvas>
        </div>

        <!-- Consultation Durations Chart -->
        <div class="card chart-container">
            <h2>Consultation Durations</h2>
            <canvas id="consultationDurationsChart"></canvas>
        </div>
    </div>

    <script>
        // Therapist Performance Data
        const therapistNames = <?php echo json_encode($therapistNames); ?>;
        const patientCounts = <?php echo json_encode($patientCounts); ?>;

        const therapistPerformanceCtx = document.getElementById('therapistPerformanceChart').getContext('2d');
        new Chart(therapistPerformanceCtx, {
            type: 'bar',
            data: {
                labels: therapistNames,
                datasets: [{
                    label: 'Number of Patients',
                    data: patientCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Case Types Data
        const caseTypes = <?php echo json_encode($caseTypes); ?>;
        const caseCounts = <?php echo json_encode($caseCounts); ?>;

        const caseTypesCtx = document.getElementById('caseTypesChart').getContext('2d');
        new Chart(caseTypesCtx, {
            type: 'pie',
            data: {
                labels: caseTypes,
                datasets: [{
                    data: caseCounts,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                }]
            }
        });

        // Consultation Durations Data
        const consultationNames = <?php echo json_encode($consultationNames); ?>;
        const consultationDurations = <?php echo json_encode($consultationDurations); ?>;

        const consultationDurationsCtx = document.getElementById('consultationDurationsChart').getContext('2d');
        new Chart(consultationDurationsCtx, {
            type: 'line',
            data: {
                labels: consultationNames,
                datasets: [{
                    label: 'Consultation Duration (minutes)',
                    data: consultationDurations,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Logout function
        function logout() {
            // Here you can implement logout logic (e.g., clearing session, etc.)
            // Redirecting to the login page
            window.location.href = 'login.php'; // Change to your login page URL
        }
    </script>
</body>
</html>
