<?php
$servername = "localhost"; // XAMPP default
$username = "root"; // XAMPP default
$password = ""; // XAMPP default
$dbname = "auditor_dashboard";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
