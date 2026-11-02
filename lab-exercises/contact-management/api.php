<?php
// ==============================================================
// Contact Management PHP Backend (CRUD)
// Supports: GET (view), POST (add), PUT (edit), DELETE (delete)
// ==============================================================
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "contacts_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database Connection Failed"]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // VIEW CONTACTS
        $res = $conn->query("SELECT * FROM contacts ORDER BY id DESC");
        $contacts = [];
        while ($row = $res->fetch_assoc()) {
            $contacts[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $contacts]);
        break;

    case 'POST':
        // ADD CONTACT
        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
        $name     = trim($data['name'] ?? '');
        $phone    = trim($data['phone'] ?? '');
        $email    = trim($data['email'] ?? '');
        $category = trim($data['category'] ?? 'Personal');
        $notes    = trim($data['notes'] ?? '');

        if (empty($name) || empty($phone)) {
            echo json_encode(["status" => "error", "message" => "Name and Phone are required."]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO contacts (name, phone, email, category, notes) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $phone, $email, $category, $notes);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Contact added successfully!", "id" => $conn->insert_id]);
        } else {
            echo json_encode(["status" => "error", "message" => $stmt->error]);
        }
        $stmt->close();
        break;

    case 'PUT':
        // EDIT CONTACT
        $data = json_decode(file_get_contents("php://input"), true);
        $id       = intval($data['id'] ?? 0);
        $name     = trim($data['name'] ?? '');
        $phone    = trim($data['phone'] ?? '');
        $email    = trim($data['email'] ?? '');
        $category = trim($data['category'] ?? 'Personal');
        $notes    = trim($data['notes'] ?? '');

        if ($id <= 0 || empty($name)) {
            echo json_encode(["status" => "error", "message" => "Valid Contact ID and Name required."]);
            exit;
        }

        $stmt = $conn->prepare("UPDATE contacts SET name=?, phone=?, email=?, category=?, notes=? WHERE id=?");
        $stmt->bind_param("sssssi", $name, $phone, $email, $category, $notes, $id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Contact updated successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => $stmt->error]);
        }
        $stmt->close();
        break;

    case 'DELETE':
        // DELETE CONTACT
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? ($_GET['id'] ?? 0));

        if ($id <= 0) {
            echo json_encode(["status" => "error", "message" => "Valid Contact ID required."]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM contacts WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Contact deleted successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => $stmt->error]);
        }
        $stmt->close();
        break;
}

$conn->close();
?>
