<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Auditor Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-image: url(Images/2.png);

        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 1000;
        }
        .login-container {
            background-color: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 300px;
        }
        .login-container h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        .login-container input[type="text"], 
        .login-container input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .login-container input[type="submit"] {
            width: 100%;
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .login-container input[type="submit"]:hover {
            background-color: #45a049;
        }
        .error {
            color: red;
            text-align: center;
        }
    </style>
</head>
<body>

    <header>
        <h1>Welcome to the Auditor Dashboard</h1>
    </header>

    <div class="login-container">
        <h1>Auditor Login</h1>
        <?php
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Database connection
            $conn = new mysqli('localhost', 'root', '', 'auditor_dashboard');
            
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Get form data
            $username = $_POST['username'];
            $password = $_POST['password'];

            // Sanitize inputs to prevent SQL injection
            $username = $conn->real_escape_string($username);
            $password = $conn->real_escape_string($password);

            // Query to check if username and password match
            $sql = "SELECT * FROM auditors WHERE username = '$username' AND password = '$password'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                // Login success
                session_start();
                $_SESSION['username'] = $username;
                header('Location: dashboard.php');
            } else {
                // Login failed
                echo "<p class='error'>Invalid username or password</p>";
            }

            $conn->close();
        }
        ?>
        <form action="" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit" value="Login">
        </form>
    </div>

</body>
</html>
