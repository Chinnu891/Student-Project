<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

$host = "sql102.infinityfree.com";
$username = "if0_40822494";
$password = "GyFslrhiLlD26S";
$database = "if0_40822494_student_registration";

$conn = new mysqli($host, $username, $password, $database);

$data = json_decode(file_get_contents("php://input"), true);

$original_id  = $data['original_id'] ?? '';
$student_id   = $data['student_id'] ?? '';
$student_name = $data['student_name'] ?? '';
$dob          = $data['dob'] ?? '';
$college_id   = $data['college_id'] ?? '';
$discipline   = $data['discipline'] ?? '';
$branch       = $data['branch'] ?? '';
$father_id    = $data['father_id'] ?? ''; // allow empty string

if (
    empty($original_id) || empty($student_id) || empty($student_name) || empty($dob) ||
    empty($college_id) || empty($discipline) || empty($branch)
) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$college_id = (int)$college_id;

$stmt = $conn->prepare("
    UPDATE students 
    SET student_id = ?, student_name = ?, dob = ?, college_id = ?, discipline = ?, branch = ?, father_id = ?
    WHERE student_id = ?
");

$stmt->bind_param("sssissss", 
    $student_id, $student_name, $dob, $college_id, $discipline, $branch, $father_id, $original_id
);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Student updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "No changes made or student not found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Failed to update student", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
