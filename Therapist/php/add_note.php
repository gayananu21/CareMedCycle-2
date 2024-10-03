<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Include the database connection
include('db_connection.php');

// Get the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['date']) &&
    isset($data['note']) &&
    isset($data['patient_type']) &&
    isset($data['patient_id'])
) {
    $date = $data['date'];
    $note = $data['note'];
    $patient_type = $data['patient_type'];
    $patient_id = $data['patient_id'];

    // Insert note into the database
    $query = "INSERT INTO patient_notes (patient_id, date, note, note_type) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('isss', $patient_id, $date, $note, $patient_type);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add note to the database.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required data.']);
}
?>
