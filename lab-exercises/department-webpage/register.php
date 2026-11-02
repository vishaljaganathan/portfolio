<?php
// ==============================================================
// Student Registration Backend Handler (PHP + MySQL)
// ==============================================================
require_once "db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $regNo    = trim($_POST["reg_no"] ?? "");
    $fullName = trim($_POST["full_name"] ?? "");
    $email    = trim($_POST["email"] ?? "");
    $program  = trim($_POST["program"] ?? "");
    $semester = trim($_POST["semester"] ?? "");
    $password = trim($_POST["password"] ?? "");

    if (empty($regNo) || empty($fullName) || empty($email) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Please fill in all mandatory fields."]);
        exit;
    }

    // Check existing registration
    $check = $conn->prepare("SELECT id FROM students WHERE reg_no = ? OR email = ?");
    $check->bind_param("ss", $regNo, $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Student with this Register No or Email already exists."]);
        $check->close();
        exit;
    }
    $check->close();

    // Hash password for security
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $insert = $conn->prepare("INSERT INTO students (reg_no, full_name, email, program, semester, password_hash) VALUES (?, ?, ?, ?, ?, ?)");
    $insert->bind_param("ssssss", $regNo, $fullName, $email, $program, $semester, $passwordHash);

    if ($insert->execute()) {
        echo json_encode(["status" => "success", "message" => "Student registration successful! You can now login."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed: " . $insert->error]);
    }

    $insert->close();
}
$conn->close();
?>
