<?php
// db.php: Database connection
$host = 'localhost';
$dbname = 'wellness_app';  //  database name
$username = 'root';        //  MySQL username
$password = '';            //  MySQL password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
