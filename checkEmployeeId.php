<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$employee_id = $_GET['employee_id'] ?? '';

if (!$employee_id) {
    echo "invalid";
    exit;
}

$stmt = $conn->prepare("SELECT employee_id FROM employee WHERE employee_id = ?");
$stmt->bind_param("s", $employee_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "exists";
} else {
    echo "not exists";
}

$stmt->close();
$conn->close();
?>
