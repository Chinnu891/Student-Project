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

$data = json_decode(file_get_contents("php://input"), true);
$student_id = $data['student_id'];

$stmt = $conn->prepare("DELETE FROM students WHERE student_id = ?");
$stmt->bind_param("s", $student_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$conn->close();
?>
