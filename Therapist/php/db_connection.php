<?php

header("Access-Control-Allow-Origin: *"); // Allows all origins
header("Content-Type: application/json"); // Ensures the response is treated as JSON

$servername = "localhost";
$username = "root"; // Your MySQL username
$password = "";     // Your MySQL password (empty for XAMPP by default)
$dbname = "care_db"; // Your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
