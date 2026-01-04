<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Origin: http://localhost:3000");

$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

$conn = new mysqli($host, $username, $password, $database);

$data = json_decode(file_get_contents("php://input"), true);

$student_id = $data['student_id'];
$name = $data['student_name'];
$dob = $data['dob'];
$college = $data['college_id'];
$discipline = $data['discipline'];
$branch = $data['branch'];
$father_id = $data['father_id'];

$stmt = $conn->prepare("UPDATE students 
    SET student_name = ?, dob = ?, college_id = ?, discipline = ?, branch = ?, father_id = ?
    WHERE student_id = ?");
$stmt->bind_param("sssssss", $name, $dob, $college_id, $discipline, $branch, $father_id, $student_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$conn->close();
?>
