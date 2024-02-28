<?php
// add_score.php - Script to add a score to the database

include 'db.php';

// Get data from the AJAX request
$playerName = $_POST['player_name'];
$score = $_POST['score'];
$subject = $_POST['subject'];

// Prepare SQL statement
$sql = "INSERT INTO scores (player_name, score, subject) VALUES ('$playerName', '$score', '$subject')";

// Execute SQL statement
if ($conn->query($sql) === TRUE) {
    echo "Score added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close database connection
$conn->close();
?>
