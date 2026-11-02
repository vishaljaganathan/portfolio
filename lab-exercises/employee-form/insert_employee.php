<?php
// ==============================================================
// PONDICHERRY UNIVERSITY - MCA LAB EXERCISE 5
// Backend PHP Script for phpMyAdmin / MySQL Integration
// ==============================================================

header("Content-Type: application/json; charset=UTF-8");

$host     = "localhost";
$username = "root";
$password = "";
$database = "employee_db";

// 1. Establish connection to MySQL
$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// 2. Process POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName   = trim($_POST['fullName'] ?? '');
    $email      = trim($_POST['email'] ?? '');
    $phone      = trim($_POST['phone'] ?? '');
    $department = trim($_POST['department'] ?? '');
    $joinDate   = trim($_POST['joinDate'] ?? '');
    $address    = trim($_POST['address'] ?? '');
    $gender     = trim($_POST['gender'] ?? '');

    // Validation
    if (empty($fullName) || empty($email) || empty($phone) || empty($department)) {
        echo json_encode(["status" => "error", "message" => "All required fields must be filled."]);
        exit();
    }

    // Prepare and Bind
    $stmt = $conn->prepare("INSERT INTO employees (full_name, email, phone, department, join_date, address, gender) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $fullName, $email, $phone, $department, $joinDate, $address, $gender);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Employee registered successfully in phpMyAdmin database!",
            "id" => $conn->insert_id
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to store employee: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all employees
    $result = $conn->query("SELECT * FROM employees ORDER BY id DESC");
    $employees = [];

    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }

    echo json_encode(["status" => "success", "data" => $employees]);
}

$conn->close();
?>
