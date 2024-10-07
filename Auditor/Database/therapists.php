<?php
include 'db_connection.php';

// Query to get therapist details
$sql = "SELECT therapists.name, COUNT(patients.id) AS num_patients, GROUP_CONCAT(DISTINCT consultations.case_type SEPARATOR ', ') AS case_types, 
        AVG(consultations.consultation_duration) AS avg_duration
        FROM therapists 
        LEFT JOIN patients ON therapists.id = patients.therapist_id
        LEFT JOIN consultations ON therapists.id = consultations.therapist_id
        GROUP BY therapists.name";

$result = $conn->query($sql);
$therapists = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $therapists[] = array(
            "name" => $row['name'],
            "patients" => $row['num_patients'],
            "case_types" => $row['case_types'],
            "consultation_duration" => round($row['avg_duration'], 2) . " minutes"
        );
    }
}

echo json_encode($therapists);
$conn->close();
?>
