<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require '../db_connection.php';

$sql = "SELECT id, question, section, type, required, status FROM tbl_question ORDER BY section, id";
$result = $conn->query($sql);

$sections = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $sectionName = $row['section'];
        $questionId = $row['id'];

        $choices_sql = "SELECT choice_text FROM tbl_choices WHERE question_id = ?";
        $stmt = $conn->prepare($choices_sql);
        $stmt->bind_param("i", $questionId);
        $stmt->execute();
        $choices_result = $stmt->get_result();

        $choices = [];
        while ($choice_row = $choices_result->fetch_assoc()) {
            $choices[] = $choice_row['choice_text'];
        }

        $questionData = [
            "id" => $questionId,
            "question" => $row['question'],
            "type" => $row['type'],
            "required" => (bool) $row['required'],
            "status" => $row['status'],
        ];

        if (!empty($choices)) {
            $questionData['choices'] = $choices;
        }


        if (!isset($sections[$sectionName])) {
            $sections[$sectionName] = [];
        }
        $sections[$sectionName][] = $questionData;
    }
}

echo json_encode($sections, JSON_PRETTY_PRINT);

$conn->close();
