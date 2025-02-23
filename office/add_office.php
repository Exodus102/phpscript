<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require '../db_connection.php';

$division = $_POST['division'];
$unit = $_POST['unit'];
$email = $_POST['email'];
$password = $_POST['password'];

if (empty($division) || empty($unit) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields']);
    exit();
}

$check_sql = "SELECT * FROM tbl_office_list WHERE office = '$unit'";
$result = $conn->query($check_sql);

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Office already exists']);
    exit();
}

$sql = "INSERT INTO tbl_office_list (division, office, email, password) VALUES ('$division', '$unit', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    $update_sql = "UPDATE tbl_office_list SET office_list_id = '$last_id' WHERE id = '$last_id'";
    if ($conn->query($update_sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Unit added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating office_list_id: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $sql . '<br>' . $conn->error]);
}

$conn->close();
