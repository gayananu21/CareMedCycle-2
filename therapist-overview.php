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
    
   
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Therapist Overview</title>
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
            text-align: center;
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
        .card h2 {
            margin-top: 0;
        }
        .card .performance {
            display: flex;
            justify-content: space-between;
        }
        .card canvas {
            margin-top: 20px;
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
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            color: black;
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

<header>
    <h1>Therapist Overview</h1>
    <button class="logout-button" onclick="logout()">Logout</button>
</header>

<nav>
    <a href="home.php"><i class="fas fa-home"></i> Home</a>
    <a href="edit-info.php"><i class="fas fa-user-edit"></i> Edit Personal Info</a>
    <a href="dashboard.php"><i class="fas fa-user-md"></i> Dashboard</a>
    <a href="audit-logs.php"><i class="fas fa-file-alt"></i> Audit Logs</a>
</nav>

<div class="container">
    <h2>Therapist Overview</h2>
    <p>This section provides an overview of the therapists, including patient counts and case types.</p>
    
    <table>
        <thead>
            <tr>
                <th>Therapist Name</th>
                <th>Number of Patients</th>
                <th>Types of Cases</th>
                <th>Average Consultation Duration</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Database connection
            $dsn = 'mysql:host=localhost;dbname=auditor_dashboard'; // Replace with your actual database name
            $username = 'root'; // Default XAMPP user
            $password = ''; // Default password is empty for XAMPP

            try {
                $pdo = new PDO($dsn, $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                // Fetch therapist data
                $sql = "SELECT therapist_name, number_of_patients, case_types, consultation_duration FROM therapists";
                $stmt = $pdo->query($sql);
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    echo "<tr>";
                    echo "<td>{$row['therapist_name']}</td>";
                    echo "<td>{$row['number_of_patients']}</td>";
                    echo "<td>{$row['case_types']}</td>";
                    echo "<td>{$row['consultation_duration']} minutes</td>"; // Append "minutes" to the duration
                    echo "</tr>";
                }
            } catch (PDOException $e) {
                echo '<tr><td colspan="4" style="color:red;">Error: ' . $e->getMessage() . '</td></tr>';
            }
            ?>
        </tbody>
    </table>
    
    <script>
    // Logout function
    function logout() {
        // Here you can implement logout logic (e.g., clearing session, etc.)
        // Redirecting to the login page
        window.location.href = 'login.php'; // Change to your login page URL
    }
    </script>
</div>

</body>
</html>
