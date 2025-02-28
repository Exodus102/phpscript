<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require '../db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['questions'])) {
    echo json_encode(["error" => "No questions provided"]);
    exit;
}

foreach ($data['questions'] as $question) {
    $section = $question['section'];
    $old_question_text = $question['old_question'];
    $question_text = $question['question'];
    $type = $question['type'];
    $status = 1;
    $required = isset($question['required']) ? (int)$question['required'] : 1;
    $new_choices = isset($question['choices']) ? $question['choices'] : [];

    // Check if the question exists
    $check_query = "SELECT id FROM tbl_question WHERE section = ? AND question = ? AND status = 1";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("ss", $section, $old_question_text);
    $check_stmt->execute();
    $result = $check_stmt->get_result();
    $existing_question = $result->fetch_assoc();
    $check_stmt->close();

    if ($existing_question) {
        // Update existing question
        $question_id = $existing_question['id'];
        $update_query = "UPDATE tbl_question SET question = ?, type = ?, required = ? WHERE id = ?";
        $update_stmt = $conn->prepare($update_query);
        $update_stmt->bind_param("ssii", $question_text, $type, $required, $question_id);
        $update_stmt->execute();
        $update_stmt->close();
    } else {
        // Insert new question
        $query = "INSERT INTO tbl_question (section, question, type, status, required) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssii", $section, $question_text, $type, $status, $required);
        $stmt->execute();
        $question_id = $stmt->insert_id;
        $stmt->close();
    }

    // Update choices
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

    $new_choices_text = array_map(fn($c) => $c['choice_text'], $new_choices);
    $choices_to_add = array_diff($new_choices_text, $existing_choices);
    $choices_to_remove = array_diff($existing_choices, $new_choices_text);

    if (!empty($choices_to_add)) {
        $insert_choice_query = "INSERT INTO tbl_choices (question_id, choice_text) VALUES (?, ?)";
        $insert_choice_stmt = $conn->prepare($insert_choice_query);

        foreach ($choices_to_add as $choice_text) {
            $insert_choice_stmt->bind_param("is", $question_id, $choice_text);
            $insert_choice_stmt->execute();
        }
        $insert_choice_stmt->close();
    }

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

if (isset($data['deletedQuestions'])) {
    foreach ($data['deletedQuestions'] as $deletedQuestion) {
        $section = $deletedQuestion['section'];
        $question_text = $deletedQuestion['question'];

        $delete_question_query = "DELETE FROM tbl_question WHERE section = ? AND question = ?";
        $delete_question_stmt = $conn->prepare($delete_question_query);
        $delete_question_stmt->bind_param("ss", $section, $question_text);
        $delete_question_stmt->execute();
        $delete_question_stmt->close();
    }
}

echo json_encode(["success" => "Survey processed successfully"]);
$conn->close();
