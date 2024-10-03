<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('db_connection.php');

// Get the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Check if all necessary fields are present
if (
    isset($data['session_id']) && isset($data['title']) && isset($data['date']) &&
    isset($data['time_start']) && isset($data['time_end']) &&
    isset($data['location']) && isset($data['patients']) && is_array($data['patients'])
) {
    $session_id = $data['session_id'];
    $title = $data['title'];
    $date = $data['date'];
    $time_start = $data['time_start'];
    $time_end = $data['time_end'];
    $location = $data['location'];
    $patients = $data['patients'];

    // Update session details in the 'upcoming_sessions' table
    $stmt = $conn->prepare("UPDATE upcoming_sessions SET session_name = ?, session_date = ?, session_time_start = ?, session_time_end = ?, location = ? WHERE id = ?");
    $stmt->bind_param('sssssi', $title, $date, $time_start, $time_end, $location, $session_id);

    if ($stmt->execute()) {
        // Remove current patients for the session
        $stmt_delete = $conn->prepare("DELETE FROM session_participants WHERE session_id = ?");
        $stmt_delete->bind_param('i', $session_id);
        $stmt_delete->execute();

        // Insert updated patients into 'session_participants' table
        foreach ($patients as $patient_id) {
            $stmt_patient = $conn->prepare("INSERT INTO session_participants (session_id, patient_id) VALUES (?, ?)");
            $stmt_patient->bind_param('ii', $session_id, $patient_id);
            $stmt_patient->execute();
        }

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update session.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required data.']);
}
?>
