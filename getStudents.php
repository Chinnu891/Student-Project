<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

$conn = new mysqli($host, $username, $password, $database);

// Parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$search = $_GET['search'] ?? '';
$field = $_GET['field'] ?? 'student_id';
$sortField = $_GET['sortField'] ?? $field;
$sortOrder = strtolower($_GET['sortOrder'] ?? 'asc') === 'desc' ? 'DESC' : 'ASC';
$offset = ($page - 1) * $limit;

// Field map
$allowedFields = [
  'student_id' => 's.student_id',
  'student_name' => 's.student_name',
  'college_name' => 'c.college_name',
  'branch' => 's.branch',
  'father_employee_id' => 'e.employee_id'
];

$fieldKey = $allowedFields[$field] ?? 's.student_id';
$sortKey = $allowedFields[$sortField] ?? 's.student_id';

// Search condition logic
$whereClause = "";
$searchParam = "";

if ($field === 'student_id') {
  // Always prefix match for student_id
  $whereClause = "$fieldKey LIKE ?";
  $searchParam = '%' . $search . '%';
} else {
  // Prefix match for other fields
  $whereClause = "$fieldKey LIKE ?";
  $searchParam = $search . '%';
}


// Fetch students
$stmt = $conn->prepare("
  SELECT 
    s.*, 
    c.college_name, 
    e.employee_id AS father_employee_id, 
    e.employee_name AS father_name
  FROM students s
  LEFT JOIN colleges c ON s.college_id = c.id
  LEFT JOIN employee e ON s.father_id = e.employee_id
  WHERE $whereClause
  ORDER BY $sortKey $sortOrder
  LIMIT ? OFFSET ?
");

$stmt->bind_param("sii", $searchParam, $limit, $offset);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
while ($row = $result->fetch_assoc()) {
  $students[] = $row;
}

// Total count
$countStmt = $conn->prepare("
  SELECT COUNT(*) AS total
  FROM students s
  LEFT JOIN colleges c ON s.college_id = c.id
  LEFT JOIN employee e ON s.father_id = e.employee_id
  WHERE $whereClause
");
$countStmt->bind_param("s", $searchParam);
$countStmt->execute();
$countResult = $countStmt->get_result();
$total = $countResult->fetch_assoc()['total'] ?? 0;

echo json_encode([
  "students" => $students,
  "total" => $total
]);

$conn->close();
?>
