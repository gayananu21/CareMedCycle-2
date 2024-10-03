<?php
include 'db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$patient_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($patient_id > 0) {
    $query = "SELECT * FROM patients WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $patient_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $patient = $result->fetch_assoc();

    if ($patient) {
        // Fetch patient notes
        $notes_query = "SELECT * FROM patient_notes WHERE patient_id = ?";
        $notes_stmt = $conn->prepare($notes_query);
        $notes_stmt->bind_param("i", $patient_id);
        $notes_stmt->execute();
        $notes_result = $notes_stmt->get_result();
        $notes = $notes_result->fetch_all(MYSQLI_ASSOC);

        // Return patient details with notes
        echo json_encode([
            'patient' => $patient,
            'notes' => $notes
        ]);
    } else {
        echo json_encode(['error' => 'Patient not found']);
    }

    $stmt->close();
    $notes_stmt->close();
} else {
    echo json_encode(['error' => 'No patient ID provided']);
}

$conn->close();
?>
