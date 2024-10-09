<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php");  // Redirect to login page if not logged in
    exit;
}

// Retrieve the logged-in user's username
$username = $_SESSION['username'];

// Database connection
$dsn = 'mysql:host=localhost;dbname=auditor_dashboard';  
$dbUsername = 'root';  // Default XAMPP user
$dbPassword = '';      // Default password for XAMPP

try {
    $pdo = new PDO($dsn, $dbUsername, $dbPassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch current user details based on username
    $sql = "SELECT email, phone FROM auditors WHERE username = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if the user exists
    if (!$user) {
        echo '<div class="error-message">User not found.</div>';
        exit;
    }

    // If the form is submitted, process the data
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST['email'];
        $phone = $_POST['phone'];

        // Update the user's details
        $sql = "UPDATE auditors SET email = ?, phone = ? WHERE username = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email, $phone, $username]);

        // Set a success message to display
        $successMessage = 'Your information has been updated successfully!';
        
        // Refresh the form with the updated information
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    }

} catch (PDOException $e) {
    echo  '</div>';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Edit Personal Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-image: url(Images/2.png);
        }
        .info-container {
            background-color: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 400px;
        }
        .info-container h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        .info-container input[type="email"], 
        .info-container input[type="text"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .info-container input[type="submit"], .info-container button {
            width: 100%;
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px; /* Add some space between buttons */
        }
        .info-container input[type="submit"]:hover, .info-container button:hover {
            background-color: #45a049;
        }
        .success-message {
            color: green;
            text-align: center;
            margin-top: 10px;
        }
        .error-message {
            color: red;
            text-align: center;
            margin-top: 10px;
        }
    </style>
</head>
<body>

    <div class="info-container">
        <h1>Edit Personal Information</h1>

        <!-- Form pre-filled with current user data -->
        <form method="POST" action="">
            <input type="email" name="email" placeholder="Email Address" value="<?php echo htmlspecialchars($user['email']); ?>" required>
            <input type="text" name="phone" placeholder="Phone Number" value="<?php echo htmlspecialchars($user['phone']); ?>" required>
            <input type="submit" value="Save Information">
            <button type="button" onclick="window.location.href='dashboard.php';">Cancel</button>
        </form>

        <?php if (isset($successMessage)): ?>
            <div class="success-message">
                <?php echo $successMessage; ?>
            </div>
            <script>
                // Redirect to dashboard after 3 seconds
                setTimeout(function() {
                    window.location.href = "dashboard.php";
                }, 3000);
            </script>
        <?php endif; ?>
    </div>

</body>
</html>
