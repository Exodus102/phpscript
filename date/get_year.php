<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header('Access-Control-Allow-Headers: Content-Type');

require '../index.php';

$sql = "SELECT DISTINCT YEAR(timestamp) AS year FROM tbl_responses ORDER BY year DESC";
$result = $conn->query($sql);

$years = [];
while ($row = $result->fetch_assoc()) {
    $years[] = $row["year"];
}

echo json_encode($years);
$conn->close();
