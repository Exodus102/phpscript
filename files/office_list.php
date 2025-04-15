<?php

function addOfficeList($pdf, $page4Id, $quarter, $year, $campus, $conn, $officeName)
{
    $pdf->AddPage();
    $pdf->useTemplate($page4Id);

    $pdf->SetFont('Arial', 'B', 14);
    $pdf->SetY(35);
    $pdf->SetX(0);
    $pdf->Cell(210, 10, "CUSTOMER SATISFACTION SURVEY", 0, 1, 'C');

    $pdf->SetFont('Arial', '', 12);
    $pdf->SetX(30);
    $pdf->Cell(30, 10, "Office:", 0, 0);

    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, $officeName, 0, 1);

    $textWidth = $pdf->GetStringWidth($officeName);
    $pdf->SetDrawColor(0, 0, 0);
    $pdf->SetLineWidth(0.5);
    $startX = 61;
    $pdf->Line($startX, $pdf->GetY() - 3, $startX + $textWidth, $pdf->GetY() - 3);

    $pdf->Ln(3);
    $pdf->SetY($pdf->GetY() - 6);

    $quarterTextMap = [
        '1st Quarter CSS Report' => "January to March",
        '2nd Quarter CSS Report' => "April to June",
        '3rd Quarter CSS Report' => "July to September",
        '4th Quarter CSS Report' => "October to December"
    ];

    $quarterText = $quarterTextMap[$quarter] ?? "Unknown Quarter";

    $pdf->SetFont('Arial', '', 12);
    $pdf->SetX(60);
    $pdf->Cell(0, 8, "{$quarterText} {$year}", 0, 1);

    $pdf->Ln(7);
    $pdf->SetY($pdf->GetY() - 6);

    // Table Header
    $pdf->SetFont('Arial', 'B', 11);
    $colWidths = [10, 110, 18, 18];
    $pdf->SetFillColor(255, 255, 255);
    $pdf->SetLineWidth(0.1);
    $startX = 30;
    $pdf->SetX($startX);
    $pdf->Cell($colWidths[0], 5, '', 1, 0, 'C', true); // Blank
    $pdf->Cell($colWidths[1], 5, '', 1, 0, 'C', true); // Blank
    $pdf->Cell($colWidths[2], 5, 'Mean', 1, 0, 'C', true);
    $pdf->Cell($colWidths[3], 5, 'VI', 1, 1, 'C', true);

    $pdf->SetFont('Arial', '', 11);

    // --- Fetch dynamic questions with header = 1
    $questionQuery = "SELECT question FROM tbl_question WHERE header = 1 ORDER BY id ASC";
    $result = $conn->query($questionQuery);



    while ($row = $result->fetch_assoc()) {
        $col1 = "";
        $col2 = $row['question'];


        // Save current Y for height measurement
        $yBefore = $pdf->GetY();

        // Measure height for col2
        $pdf->SetXY($startX + $colWidths[0], $yBefore);
        $pdf->MultiCell($colWidths[1], 5, $col2, 0);
        $cellHeight = $pdf->GetY() - $yBefore;

        // Reset and draw all cells
        $pdf->SetXY($startX, $yBefore);
        $pdf->Cell($colWidths[0], $cellHeight, $col1, 1);
        $pdf->SetXY($startX + $colWidths[0], $yBefore);
        $pdf->MultiCell($colWidths[1], 5, $col2, 1);
        $pdf->SetXY($startX + $colWidths[0] + $colWidths[1], $yBefore);
        $pdf->Cell($colWidths[2], $cellHeight, '', 1, 0, 'C');
        $pdf->Cell($colWidths[3], $cellHeight, '', 1, 1, 'C');
    }
}
