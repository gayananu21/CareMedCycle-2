<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Audit Logs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
            background-image: url(Images/2.png);

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

<div class="container">
    <h2>Audit Logs</h2>
    <p>This section displays the audit logs for activities conducted by auditors.</p>
    
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
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

                // Fetch audit logs data
                $sql = "SELECT log_date, user, action, details FROM audit_logs"; // Replace with your actual table name
                $stmt = $pdo->query($sql);
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    echo "<tr>";
                    echo "<td>{$row['log_date']}</td>";
                    echo "<td>{$row['user']}</td>";
                    echo "<td>{$row['action']}</td>";
                    echo "<td>{$row['details']}</td>";
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
