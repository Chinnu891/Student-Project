<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// DB Connection
$host = "sql102.infinityfree.com";
$username = "if0_40822494";
$password = "GyFslrhiLlD26S";
$database = "if0_40822494_student_registration";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Parse input
$data = json_decode(file_get_contents("php://input"), true);
$college_name = isset($data['college_name']) ? trim($data['college_name']) : '';

if (!$college_name) {
    echo json_encode(["success" => false, "message" => "College name is required"]);
    exit;
}

// Capitalize each word (e.g., "abc college" → "Abc College")
$college_name = ucwords(strtolower($college_name));

// Check if college already exists
$check = $conn->prepare("SELECT id FROM colleges WHERE college_name = ?");
$check->bind_param("s", $college_name);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    $check->bind_result($existingId);
    $check->fetch();
    echo json_encode([
        "success" => true,
        "id" => $existingId,  // 🔁 changed from college_id → id
        "college_name" => $college_name,
        "message" => "College already exists"
    ]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// Insert new college
$insert = $conn->prepare("INSERT INTO colleges (college_name) VALUES (?)");
$insert->bind_param("s", $college_name);

if ($insert->execute()) {
    echo json_encode([
        "success" => true,
        "id" => $insert->insert_id,  // 🔁 changed from college_id → id
        "college_name" => $college_name,
        "message" => "College added successfully"
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to insert college"]);
}

$insert->close();
$conn->close();
?>
