<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include the database connection
include('db_connection.php');

// Get the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['noteId']) &&
    isset($data['patientId']) &&
    isset($data['date']) &&
    isset($data['note']) &&
    isset($data['note_type'])
) {
    $noteId = $data['noteId'];
    $patientId = $data['patientId'];
    $date = $data['date'];
    $note = $data['note'];
    $noteType = $data['note_type'];
    $customNoteType = isset($data['custom_note_type']) ? $data['custom_note_type'] : null;

    // Check if a custom note type is provided
    if ($noteType === 'Other' && !empty($customNoteType)) {
        $noteType = $customNoteType;  // If "Other", use the custom note type
    }

    // Prepare the SQL query to update the note
    $query = "UPDATE patient_notes SET date = ?, note = ?, note_type = ? WHERE note_id = ? AND patient_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssssi', $date, $note, $noteType, $noteId, $patientId);

    // Execute the query and return a response
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update the note in the database.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required data.']);
}
?>
