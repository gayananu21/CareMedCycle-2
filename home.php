<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Home - Auditor Dashboard</title>
    <style>
        
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
            background-image: url(Images/2.png);
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        header h1, h2 {
            margin: 0;
            text-align: center;
    color: #333;
        }
        nav {
            background-color: #333;
            overflow: hidden;
        }
        nav a {
            float: left;
            display: block;
            color: white;
            text-align: center;
            padding: 14px 20px;
            text-decoration: none;
        }
        nav a:hover {
            background-color: #ddd;
            color: black;
        }
        .container {
            max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .card {
            background-color: white;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .card h2 {
            margin-top: 0;
        }
        .card .performance {
            display: flex;
            justify-content: space-between;
        }
        .card canvas {
            margin-top: 20px;
        }
        .logout-button {
            background-color: #f44336; /* Red */
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            float: right;
            margin: 10px;
        }
        .logout-button:hover {
            background-color: #c62828; /* Darker Red */
        }
        .chart-container {
    margin-bottom: 40px;
    text-align: center;
}
canvas {
    max-width: 400px; /* Adjust canvas width */
    max-height: 300px; /* Adjust canvas height */
    margin: 0 auto;
}

@media (max-width: 768px) {
    canvas {
        max-width: 100%;
        max-height: 200px;
    }
}
    
    </style>
</head>
<body>
    <header>
        <h1>Home</h1>
    </header>

    <nav>
        
        <a href="login.php"><i class="fas fa-sign-out-alt"></i> Login</a>
    </nav>

    <div class="container">
        <h2>Welcome to the Auditor Dashboard</h2>
        <p>Here you can oversee therapist performance, manage audit logs, and edit your personal information.</p>
    </div>
</body>
</html>
