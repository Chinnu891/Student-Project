<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Origin: http://localhost:3000");

$host = "sql102.infinityfree.com";
$username = "if0_40822494";
$password = "GyFslrhiLlD26S";
$database = "if0_40822494_student_registration";

$conn = new mysqli($host, $username, $password, $database);

$student_id = $_GET['student_id'];

$sql = "SELECT student_id FROM students WHERE student_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $student_id);
$stmt->execute();
$stmt->store_result();

echo ($stmt->num_rows > 0) ? "exists" : "available";

$conn->close();
?>
