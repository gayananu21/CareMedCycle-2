<?php
include 'db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$note_id = isset($_GET['noteId']) ? intval($_GET['noteId']) : 0;

if ($note_id > 0) {
    $query = "SELECT * FROM patient_notes WHERE note_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $note_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $note = $result->fetch_assoc();

    if ($note) {
        echo json_encode($note);
    } else {
        echo json_encode(['error' => 'Note not found']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'No note ID provided']);
}

$conn->close();
?>
