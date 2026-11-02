<?php
// ==============================================================
// Database Configuration for Department Webpage
// ==============================================================
$host     = "localhost";
$username = "root";
$password = "";
$database = "department_db";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database Connection Failed: " . $conn->connect_error]));
}
?>
