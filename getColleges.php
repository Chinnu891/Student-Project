<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to MySQL
$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Fetch colleges
$sql = "SELECT id, college_name FROM colleges ORDER BY college_name ASC";
$result = $conn->query($sql);

$colleges = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Push both ID and Name
        $colleges[] = [
            "id" => $row['id'],
            "college_name" => $row['college_name']
        ];
    }
}

echo json_encode($colleges);
$conn->close();
?>
