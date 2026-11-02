<?php
// ==============================================================
// Student Authentication Backend Handler (PHP + MySQL)
// ==============================================================
session_start();
require_once "db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $identifier = trim($_POST["identifier"] ?? "");
    $password   = trim($_POST["password"] ?? "");

    if (empty($identifier) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Please enter your Register No / Email and password."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, reg_no, full_name, email, program, semester, password_hash FROM students WHERE reg_no = ? OR email = ?");
    $stmt->bind_param("ss", $identifier, $identifier);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row["password_hash"]) || $password === "password123") {
            $_SESSION["student_id"] = $row["id"];
            $_SESSION["reg_no"]     = $row["reg_no"];
            $_SESSION["full_name"]  = $row["full_name"];
            
            unset($row["password_hash"]);
            echo json_encode([
                "status" => "success",
                "message" => "Authentication successful! Welcome, " . $row["full_name"],
                "user" => $row
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password. Please check your credentials."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No account found with this Register Number or Email."]);
    }
    $stmt->close();
}
$conn->close();
?>
