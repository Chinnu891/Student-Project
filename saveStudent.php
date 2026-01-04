<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// DB connection
$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get data from request
$data = json_decode(file_get_contents("php://input"), true);

// Extract values
$student_id = $data['student_id'];
$student_name = $data['student_name'];
$dob = $data['dob'];
$college_id = $data['college_id'];
$discipline = $data['discipline'];
$branch = $data['branch'];
$father_id = $data['father_id'];

// Check if student_id already exists
$check = $conn->prepare("SELECT student_id FROM students WHERE student_id = ?");
$check->bind_param("s", $student_id);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Student ID already exists"]);
    exit;
}

// Insert new student
$stmt = $conn->prepare("INSERT INTO students (student_id, student_name, dob, college_id, discipline, branch, father_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssisss", $student_id, $student_name, $dob, $college_id, $discipline, $branch, $father_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$conn->close();
?>
