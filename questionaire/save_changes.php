<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require '../db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['questions'])) {
    echo json_encode(["error" => "No questions provided"]);
    exit;
}

foreach ($data['questions'] as $question) {
    $section = $question['section'];
    $question_text = $question['question'];
    $type = $question['type'];
    $status = 1;
    $required = isset($question['required']) ? (int)$question['required'] : 1;
    $new_choices = isset($question['choices']) ? $question['choices'] : [];

    // Check if question already exists
    $check_query = "SELECT id, required, type FROM tbl_question WHERE section = ? AND question = ? AND status = 1";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("ss", $section, $question_text);
    $check_stmt->execute();
    $result = $check_stmt->get_result();
    $existing_question = $result->fetch_assoc();
    $check_stmt->close();

    if ($existing_question) {
        $question_id = $existing_question['id'];
        $existing_required = (int)$existing_question['required'];
        $existing_type = $existing_question['type'];

        // Check if there's a change in required or type
        if ($existing_required !== $required || $existing_type !== $type) {
            $update_query = "UPDATE tbl_question SET required = ?, type = ? WHERE id = ?";
            $update_stmt = $conn->prepare($update_query);
            $update_stmt->bind_param("isi", $required, $type, $question_id);
            $update_stmt->execute();
            $update_stmt->close();
        }
    } else {
        // Insert new question if it doesn't exist
        $query = "INSERT INTO tbl_question (section, question, type, status, required) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssii", $section, $question_text, $type, $status, $required);
        $stmt->execute();
        $question_id = $stmt->insert_id;
        $stmt->close();
    }

    // Fetch existing choices
    $existing_choices_query = "SELECT choice_text FROM tbl_choices WHERE question_id = ?";
    $existing_choices_stmt = $conn->prepare($existing_choices_query);
    $existing_choices_stmt->bind_param("i", $question_id);
    $existing_choices_stmt->execute();
    $existing_choices_result = $existing_choices_stmt->get_result();
    $existing_choices = [];

    while ($row = $existing_choices_result->fetch_assoc()) {
        $existing_choices[] = $row['choice_text'];
    }
    $existing_choices_stmt->close();

    // Compare existing choices with new choices
    $new_choices_text = array_map(fn($c) => $c['choice_text'], $new_choices);
    $choices_to_add = array_diff($new_choices_text, $existing_choices);
    $choices_to_remove = array_diff($existing_choices, $new_choices_text);

    // Insert new choices
    if (!empty($choices_to_add)) {
        $insert_choice_query = "INSERT INTO tbl_choices (question_id, choice_text) VALUES (?, ?)";
        $insert_choice_stmt = $conn->prepare($insert_choice_query);

        foreach ($choices_to_add as $choice_text) {
            $insert_choice_stmt->bind_param("is", $question_id, $choice_text);
            $insert_choice_stmt->execute();
        }
        $insert_choice_stmt->close();
    }

    // Remove choices that no longer exist
    if (!empty($choices_to_remove)) {
        $delete_choice_query = "DELETE FROM tbl_choices WHERE question_id = ? AND choice_text = ?";
        $delete_choice_stmt = $conn->prepare($delete_choice_query);

        foreach ($choices_to_remove as $choice_text) {
            $delete_choice_stmt->bind_param("is", $question_id, $choice_text);
            $delete_choice_stmt->execute();
        }
        $delete_choice_stmt->close();
    }
}

echo json_encode(["success" => "Survey processed successfully"]);
$conn->close();
