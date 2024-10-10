<?php
include 'db.php'; // Include the database connection

$logDates = [];
$users = [];
$actions = [];
$details = [];

// Audit Logs Query
$sqlLogs = "SELECT log_date, user, action, details FROM audit_logs";
$resultLogs = $conn->query($sqlLogs);

if ($resultLogs && $resultLogs->num_rows > 0) {
    while ($row = $resultLogs->fetch_assoc()) {
        $logDates[] = $row['log_date'];
        $users[] = $row['user'];
        $actions[] = $row['action'];
        $details[] = $row['details'];
    }
} else {
    echo "No data available for audit logs.";
}

// Function to generate CSV
if (isset($_POST['download_csv'])) {
    $filename = "audit_logs_" . date('Ymd') . ".csv";

    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment; filename=$filename");
    header("Content-Type: application/csv; ");

    // Create a file pointer
    $file = fopen('php://output', 'w');

    // Set the column headers
    $header = ["Date", "User", "Action", "Details"];
    fputcsv($file, $header);

    // Output the table data as CSV
    foreach ($logDates as $index => $date) {
        fputcsv($file, [
            $date,
            $users[$index],
            $actions[$index],
            $details[$index]
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
    <title>Audit Logs</title>
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
            background-color: #4CAF50; /* Green */
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
            color: black;
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
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
    <script>
        // Sorting function
        function sortTable(columnIndex) {
            const table = document.getElementById("auditTable");
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
    <h1>Audit Logs</h1>
    <button class="logout-button" onclick="logout()">Logout</button>
</header>
<nav>
    <a href="home.php"><i class="fas fa-home"></i> Home</a>
    <a href="edit-info.php"><i class="fas fa-user-edit"></i> Edit Personal Info</a>
    <a href="therapist-overview.php"><i class="fas fa-user-md"></i> Therapist Overview</a>
    <a href="dashboard.php"><i class="fas fa-file-alt"></i> Dashboard</a>
</nav>

<form method="POST">
    <button type="submit" name="download_csv">Download CSV</button>
</form>

<table id="auditTable" class="tablesorter">
    <thead>
        <tr>
            <th onclick="sortTable(0)">Date</th>
            <th onclick="sortTable(1)">User</th>
            <th onclick="sortTable(2)">Action</th>
            <th onclick="sortTable(3)">Details</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($logDates as $index => $date): ?>
            <tr>
                <td><?php echo $date; ?></td>
                <td><?php echo $users[$index]; ?></td>
                <td><?php echo $actions[$index]; ?></td>
                <td><?php echo $details[$index]; ?></td>
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
