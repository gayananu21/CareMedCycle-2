<?php

header("Access-Control-Allow-Origin: *"); // Allows all origins
header("Content-Type: application/json"); // Ensures the response is treated as JSON


// Database credentials
$host = 'localhost';    // Assuming you're using a local server with XAMPP/WAMP
$db = 'care_db';        // Your database name
$user = 'root';         // Default user for XAMPP/WAMP is root
$pass = '';             // Default password for XAMPP/WAMP is an empty string

// Create a connection to MySQL
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch all patients
$sql = "SELECT id, name, weight, eating_habits, sleeping_schedule, state_of_mind, other_issues, profile_image FROM patients";
$result = $conn->query($sql);

$patients = [];

if ($result->num_rows > 0) {
    // Loop through each row and store the data in an array
    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
}

// Return the patient data as a JSON object
header('Content-Type: application/json');
echo json_encode($patients);

// Close the connection
$conn->close();
?>
