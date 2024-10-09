<?php
// Database Connection
$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "testdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch appointments
$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

// Store appointments in an array
$appointments = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }
}

// Fetch therapist availability from the database
$availability_sql = "SELECT * FROM therapist_availability";
$availability_result = $conn->query($availability_sql);

$therapist_availability = [];
if ($availability_result->num_rows > 0) {
    while ($row = $availability_result->fetch_assoc()) {
        $therapist_availability[strtolower($row['day'])][] = $row['time'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scheduling Calendar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f5;
        }
        #calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-gap: 10px;
            background-color: #f4f4f9;
            padding: 20px;
        }
        .day {
            padding: 20px;
            background: #fff;
            border-radius: 10px;
            border: 2px solid #ddd;
            min-height: 100px;
            text-align: center;
        }
        .available {
            background-color: #d4edda;
        }
        .booked {
            background-color: #f8d7da;
        }
        .recurring {
            background-color: #fff3cd;
        }
        .conflict {
            background-color: #f5c6cb;
        }
        #guide {
            margin-top: 20px;
            padding: 10px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .color-box {
            display: inline-block;
            width: 15px;
            height: 15px;
            margin-right: 10px;
            border-radius: 3px;
        }
    </style>
</head>
<body>

<div id="calendar">
    <!-- Calendar content will be generated here -->
</div>

<!-- Color Code Guide -->
<div id="guide">
    <h3>Color Code Guide</h3>
    <ul>
        <li><span class="color-box available"></span> Available Slot</li>
        <li><span class="color-box booked"></span> Booked Slot</li>
        <li><span class="color-box recurring"></span> Recurring Appointment</li>
        <li><span class="color-box conflict"></span> Conflict Detected</li>
    </ul>
</div>

<script>
    const calendarEl = document.getElementById("calendar");
    const daysInMonth = 30; // Assuming a simplified 30-day month

    // Fetch appointments and therapist availability from PHP
    const appointments = <?php echo json_encode($appointments); ?>;
    const therapistAvailability = <?php echo json_encode($therapist_availability); ?>;

    // Function to detect conflicts
    function detectConflicts(dayAppointments) {
        const timeMap = {};
        let conflictFound = false;

        // Track appointment times for a specific day
        dayAppointments.forEach(appt => {
            if (timeMap[appt.time]) {
                timeMap[appt.time].push(appt);
                conflictFound = true; // Mark conflict when more than one appointment exists at the same time
            } else {
                timeMap[appt.time] = [appt];
            }
        });

        // Return true if conflicts were found
        return conflictFound;
    }

    // Populate calendar with days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement("div");
        dayEl.classList.add("day");
        dayEl.textContent = `Day ${day}`;

        // Filter appointments for the current day
        const dayAppointments = appointments.filter(appt => appt.day == day);

        // Check if the day has any appointments
        if (dayAppointments.length > 0) {
            // Detect if there is a conflict
            if (detectConflicts(dayAppointments)) {
                dayEl.classList.add("conflict");
                dayEl.textContent += " - Conflict Detected!";
            } else {
                // Otherwise, mark each appointment accordingly
                dayAppointments.forEach(appt => {
                    dayEl.classList.add(appt.status); // Apply class based on status (booked, recurring)
                    dayEl.textContent += `\n${appt.patient_name} at ${appt.time}`;
                });
            }
        } else {
            dayEl.classList.add("available");
        }

        calendarEl.appendChild(dayEl);
    }
</script>

</body>
</html>
