<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Origin: http://localhost:3000");


$host = "sql102.infinityfree.com";
$username = "if0_40822494";
$password = "GyFslrhiLlD26S";
$database = "if0_40822494_student_registration";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed: " . $conn->connect_error]);
    exit;
}

$sql = "SELECT employee_id, employee_name FROM employee ORDER BY employee_name ASC";
$result = $conn->query($sql);

$fathers = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $fathers[] = $row;
    }
    echo json_encode($fathers);
} else {
    echo json_encode(["success" => false, "message" => "SQL Error: " . $conn->error]);
}

$conn->close();
