<?php
include 'db.php'; // Include the database connection

// Initialize variables for storing data
$therapistNames = [];
$patientCounts = [];
$caseTypes = [];
$consultationDurations = [];

// Therapist Performance Query
$sqlTherapist = "SELECT therapist_name, number_of_patients, case_types, consultation_duration FROM therapists";
$resultTherapist = $conn->query($sqlTherapist);

if ($resultTherapist && $resultTherapist->num_rows > 0) {
    while ($row = $resultTherapist->fetch_assoc()) {
        $therapistNames[] = $row['therapist_name'];
        $patientCounts[] = $row['number_of_patients'];
        $caseTypes[] = $row['case_types'];
        $consultationDurations[] = $row['consultation_duration'];
    }
} else {
    echo "No data available for therapist performance.";
}

// Function to generate CSV
if (isset($_POST['download_csv'])) {
    $filename = "therapist_overview_" . date('Ymd') . ".csv";

    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment; filename=$filename");
    header("Content-Type: application/csv; ");

    // Create a file pointer
    $file = fopen('php://output', 'w');

    // Set the column headers
    $header = ["Therapist Name", "Number of Patients", "Types of Cases", "Average Consultation Duration (minutes)"];
    fputcsv($file, $header);

    // Output the table data as CSV
    foreach ($therapistNames as $index => $name) {
        fputcsv($file, [
            $name,
            $patientCounts[$index],
            $caseTypes[$index],
            $consultationDurations[$index]
        ]);
    }

    // Close the file pointer
    fclose($file);
    exit();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Therapist Overview</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/css/theme.default.min.css">

    <style>
         body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
            background-image: url(Images/2.jpg);

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
            margin: 20px 0;
    opacity: 0.8; /* Controls the transparency. Lower values = more transparency */
    background-color: rgba(255, 255, 255, 0.8); /* Ensure background stays white with transparency */
}
        th, td {
            padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
    background-color: rgba(255, 255, 255, 0.8); /* Keeps individual cells with slight transparency */
}
        th {
            color: black;
            background-color: #f2f2f2;
        }
    </style>
    <script>
        // Sorting function
        function sortTable(columnIndex) {
            const table = document.getElementById("therapistTable");
            let rows, switching, i, x, y, shouldSwitch;
            switching = true;

            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[columnIndex];
                    y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    </script>
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

<form method="POST">
    <button type="submit" name="download_csv">Download CSV</button>
</form>

<table id="therapistTable" class="tablesorter">
    <thead>
        <tr>
            <th onclick="sortTable(0)">Therapist Name</th>
            <th onclick="sortTable(1)">Number of Patients</th>
            <th onclick="sortTable(2)">Types of Cases</th>
            <th onclick="sortTable(3)">Average Consultation Duration</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($therapistNames as $index => $name): ?>
            <tr>
                <td><?php echo $name; ?></td>
                <td><?php echo $patientCounts[$index]; ?></td>
                <td><?php echo $caseTypes[$index]; ?></td>
                <td><?php echo $consultationDurations[$index] . " minutes"; ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<script>
    $(document).ready(function() {
        $("table").tablesorter();
    });
    function logout() {
        window.location.href = 'login.php';
    }
</script>

</body>
</html>
