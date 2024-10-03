<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('db_connection.php'); // Include your database connection

// Fetch all upcoming sessions
$query = "SELECT id, session_name, session_date, session_time_start, session_time_end, location FROM upcoming_sessions";
$result = $conn->query($query);

$sessions = [];

while ($row = $result->fetch_assoc()) {
    $session_id = $row['id'];

    // Fetch patients for each session
    $patient_query = "SELECT p.id, p.name, p.profile_image 
                      FROM patients p
                      INNER JOIN session_participants sp ON p.id = sp.patient_id
                      WHERE sp.session_id = $session_id";
    $patient_result = $conn->query($patient_query);

    $patients = [];
    while ($patient_row = $patient_result->fetch_assoc()) {
        $patients[] = [
            'id' => $patient_row['id'],
            'name' => $patient_row['name'],
            'profile_image' => $patient_row['profile_image']
        ];
    }

    $sessions[] = [
        'id' => $row['id'],
        'session_name' => $row['session_name'],
        'session_date' => $row['session_date'],
        'session_time_start' => $row['session_time_start'],
        'session_time_end' => $row['session_time_end'],
        'location' => $row['location'],
        'patients' => $patients
    ];
}

// Return data as JSON
echo json_encode($sessions);
?>
