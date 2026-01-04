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

$result = $conn->query("SELECT department_id, department_name FROM departments");

$departments = [];

while ($row = $result->fetch_assoc()) {
    $departments[] = [
        "department_id" => $row['department_id'],
        "department_name" => $row['department_name']
    ];
}

echo json_encode($departments);

$conn->close();
?>
