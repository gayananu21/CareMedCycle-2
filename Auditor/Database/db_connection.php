<?php
$servername = "localhost";
$username = "root";  //  MySQL username
$password = "";  //  MySQL password
$dbname = "wellness_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
