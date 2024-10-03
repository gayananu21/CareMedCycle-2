<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('db_connection.php'); // Include your database connection

$session_id = isset($_GET['session_id']) ? intval($_GET['session_id']) : 0;

if ($session_id > 0) {
    // Fetch session details
    $session_query = "SELECT session_name, session_date, session_time_start, session_time_end, location FROM upcoming_sessions WHERE id = ?";
    $stmt = $conn->prepare($session_query);
    $stmt->bind_param("i", $session_id);
    $stmt->execute();
    $session_result = $stmt->get_result();
    $session = $session_result->fetch_assoc();

    // Fetch patients assigned to this session
    $patients_query = "SELECT p.id, p.name, p.profile_image 
                       FROM session_participants sp
                       JOIN patients p ON sp.patient_id = p.id
                       WHERE sp.session_id = ?";
    $stmt_patients = $conn->prepare($patients_query);
    $stmt_patients->bind_param("i", $session_id);
    $stmt_patients->execute();
    $patients_result = $stmt_patients->get_result();
    $selected_patients = [];
    while ($row = $patients_result->fetch_assoc()) {
        $selected_patients[] = $row;
    }

    // Fetch all patients not in this session
    $remaining_patients_query = "SELECT p.id, p.name, p.profile_image 
                                  FROM patients p 
                                  WHERE p.id NOT IN (SELECT sp.patient_id FROM session_participants sp WHERE sp.session_id = ?)";
    $stmt_remaining = $conn->prepare($remaining_patients_query);
    $stmt_remaining->bind_param("i", $session_id);
    $stmt_remaining->execute();
    $remaining_result = $stmt_remaining->get_result();
    $remaining_patients = [];
    while ($row = $remaining_result->fetch_assoc()) {
        $remaining_patients[] = $row;
    }

    echo json_encode([
        'success' => true,
        'session' => $session,
        'patients' => $selected_patients,
        'remaining_patients' => $remaining_patients
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid session ID']);
}
?>
