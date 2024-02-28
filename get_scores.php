<?php
// get_scores.php - Script to retrieve scores from the database

include 'db.php';

// Prepare SQL statement
$sql = "SELECT * FROM scores ORDER BY score DESC";

// Execute SQL statement
$result = $conn->query($sql);

// Output scores as JSON
$scores = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }
    echo json_encode($scores);
} else {
    echo "No scores found";
}

// Close database connection
$conn->close();
?>
