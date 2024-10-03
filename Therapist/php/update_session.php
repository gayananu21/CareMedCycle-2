<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('db_connection.php');

// Get the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['session_id']) && isset($data['session_name']) &&
    isset($data['session_date']) && isset($data['session_time_start']) &&
    isset($data['session_time_end']) && isset($data['location']) &&
    isset($data['selected_patients']) && is_array($data['selected_patients'])
) {
    $session_id = $data['session_id'];
    $session_name = $data['session_name'];
    $session_date = $data['session_date'];
    $session_time_start = $data['session_time_start'];
    $session_time_end = $data['session_time_end'];
    $location = $data['location'];
    $selected_patients = $data['selected_patients'];

    // Update session details in the 'upcoming_sessions' table
    $stmt = $conn->prepare("UPDATE upcoming_sessions SET session_name = ?, session_date = ?, session_time_start = ?, session_time_end = ?, location = ? WHERE id = ?");
    $stmt->bind_param('sssssi', $session_name, $session_date, $session_time_start, $session_time_end, $location, $session_id);

    if ($stmt->execute()) {
        // Clear old participants from 'session_participants'
        $delete_stmt = $conn->prepare("DELETE FROM session_participants WHERE session_id = ?");
        $delete_stmt->bind_param('i', $session_id);
        $delete_stmt->execute();

        // Insert each patient into the 'session_participants' table
        foreach ($selected_patients as $patient_id) {
            $stmt_patient = $conn->prepare("INSERT INTO session_participants (session_id, patient_id) VALUES (?, ?)");
            $stmt_patient->bind_param('ii', $session_id, $patient_id);
            $stmt_patient->execute();
        }

        echo json_encode(['success' => true, 'message' => 'Session updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update session details.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid session data provided.']);
}
?>
