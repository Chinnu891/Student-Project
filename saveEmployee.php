<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$employee_id = $conn->real_escape_string($data['employee_id']);
$employee_name = $conn->real_escape_string($data['employee_name']);
$dob = $conn->real_escape_string($data['dob']);
$salary = $conn->real_escape_string($data['salary']);
$designation_name = $conn->real_escape_string($data['designation']);
$department_name = $conn->real_escape_string($data['department']);

// Fetch designation_id from designation_name
$designation_id = null;
$designation_result = $conn->query("SELECT designation_id FROM designations WHERE designation_name = '$designation_name'");
if ($designation_result && $designation_result->num_rows > 0) {
    $row = $designation_result->fetch_assoc();
    $designation_id = $row['designation_id'];
} else {
    echo json_encode(["success" => false, "message" => "Invalid designation"]);
    exit();
}

// Fetch department_id from department_name
$department_id = null;
$department_result = $conn->query("SELECT department_id FROM departments WHERE department_name = '$department_name'");
if ($department_result && $department_result->num_rows > 0) {
    $row = $department_result->fetch_assoc();
    $department_id = $row['department_id'];
} else {
    echo json_encode(["success" => false, "message" => "Invalid department"]);
    exit();
}

// Final Insert
$sql = "INSERT INTO employee (employee_id, employee_name, dob, salary, designation_id, department_id)
        VALUES ('$employee_id', '$employee_name', '$dob', '$salary', '$designation_id', '$department_id')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Insert failed: " . $conn->error]);
}

$conn->close();
?>
