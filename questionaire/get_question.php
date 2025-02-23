<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require '../db_connection.php';

$response = [];

$sql = "
    SELECT q.id AS question_id, q.question, q.section, q.type, q.required, 
           c.id AS choice_id, c.choice_text
    FROM tbl_question q
    LEFT JOIN tbl_choices c ON q.id = c.question_id
    ORDER BY q.section, q.id, c.id
";

$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $section = $row['section'];

        if (!isset($response[$section])) {
            $response[$section] = [];
        }

        $questionId = $row['question_id'];
        if (!isset($response[$section][$questionId])) {
            $response[$section][$questionId] = [
                'id' => $row['question_id'],
                'question' => $row['question'],
                'type' => $row['type'],
                'required' => $row['required'],
                'choices' => []
            ];
        }

        if ($row['choice_id']) {
            $response[$section][$questionId]['choices'][] = [
                'choice_id' => $row['choice_id'],
                'choice_text' => $row['choice_text'],
            ];
        }
    }

    $formattedResponse = [];
    foreach ($response as $section => $questions) {
        $formattedResponse[$section] = array_values($questions);
    }

    echo json_encode($formattedResponse);
} else {
    echo json_encode(['error' => 'Failed to fetch data: ' . $conn->error]);
}

$conn->close();
