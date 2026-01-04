<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

$result = $conn->query("SELECT designation_id, designation_name FROM designations");

$designations = [];

while ($row = $result->fetch_assoc()) {
    $designations[] = [
        "designation_id" => $row['designation_id'],
        "designation_name" => $row['designation_name']
    ];
}

echo json_encode($designations);

$conn->close();
?>
