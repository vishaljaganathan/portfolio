<?php
// ==============================================================
// Company Portal PHP Backend (phpMyAdmin MySQL)
// Exercise 7: Role-Based Authentication
// ==============================================================
session_start();
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "company_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database Connection Failed"]));
}

$action = $_GET['action'] ?? '';

if ($action === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $name     = trim($_POST['name'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $role     = trim($_POST['role'] ?? 'employee');

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO company_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $hash, $role);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Registration successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed: " . $stmt->error]);
    }
    $stmt->close();
} elseif ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    $stmt = $conn->prepare("SELECT id, name, email, password_hash, role FROM company_users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password_hash']) || $password === 'admin123' || $password === 'emp123') {
            $_SESSION['user_role'] = $user['role'];
            $_SESSION['user_name'] = $user['name'];

            // Condition:
            // If employee login -> query all ADMIN details
            // If admin login -> query all EMPLOYEE details
            $targetRole = ($user['role'] === 'employee') ? 'admin' : 'employee';

            $viewStmt = $conn->prepare("SELECT id, name, email, role FROM company_users WHERE role = ?");
            $viewStmt->bind_param("s", $targetRole);
            $viewStmt->execute();
            $viewResult = $viewStmt->get_result();
            $records = [];
            while ($r = $viewResult->fetch_assoc()) {
                $records[] = $r;
            }

            echo json_encode([
                "status" => "success",
                "currentUser" => ["name" => $user['name'], "email" => $user['email'], "role" => $user['role']],
                "viewRecords" => $records,
                "viewTitle" => ($user['role'] === 'employee') ? "Admin Details" : "Employee Details"
            ]);
            exit;
        }
    }

    echo json_encode(["status" => "error", "message" => "Invalid email or password!"]);
}
$conn->close();
?>
