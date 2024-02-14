const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const skipButton = document.getElementById("skip");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timerEl = document.getElementById("timer");
const startEl = document.getElementById("start");
const playerNameContainer = document.getElementById("player-name-container");
const playerNameInput = document.getElementById("player-name");
const rankingEl = document.getElementById("ranking");
const clearButton = document.getElementById("clear-ranking");
const restartButton = document.getElementById("restart-button"); // Corrected reference
const timeProgress = document.querySelector(".time-progress");
let timerInterval = null;
let playerName = "";
let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let playerScores = [];


setInterval(() => {
  if (timer !== 0) {
    const increment = 100 / 60; // Assuming the timer is set to 60 seconds
    const newWidth = Math.max(100 - (timer * increment), 0); // Calculate the new width
    timeProgress.style.width = newWidth + "%"; // Set the width of the progress bar
  }
}, 1000);



// Load playerScores from localStorage on page load
if (localStorage.getItem("playerScores")) {
  playerScores = JSON.parse(localStorage.getItem("playerScores"));
}

const quiz = [
  {
    question: "What is the hottest planet?",
    choices: ["Earth", "Sun", "Jupiter", "Venus"],
    answer: 3,
  },

  {
    question: "Who invented Electricity?",
    choices: ["Einstein", "Bin Douda", "Cristiano Ronaldo", "Nicola Tesla"],
    answer: 2,
  },

  {
    question: "Acrophobia is a fear of...",
    choices: ["Heights", "Water", "Spiders", "Dark"],
    answer: 0,
  },

  {
    question: "What is the currency of China?",
    choices: ["USD", "MAD", "Yuan", "Peso"],
    answer: 2,
  },

  {
    question: "What is the national animal of Australia?",
    choices: ["Tiger", "Lion", "Kangaroo", "Eagle"],
    answer: 2,
  },
];

function start() {
  playerNameContainer.style.display = "block";
  startEl.style.display = "none";
}

function setPlayerName() {
  playerName = playerNameInput.value;
  if(playerName === ""){
    playerName = "random";
  }
  playerNameContainer.style.display = "none";
  quizContainer.style.display = "block";
  timerEl.innerText = timer;
  timerInterval = setInterval(() => { // Utilisez la variable globale timerInterval
    if (timer > 0) {
      timer--;
      timerEl.innerText = timer;
    } else {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
  showQuestion();
}


function showQuestion() {
  const question = quiz[currentQuestionIndex];
  questionEl.innerText = question.question;

  choicesEl.innerHTML = "";
  question.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.innerText = choice;
    li.dataset.index = index;
    li.onclick = checkAnswer;
    choicesEl.appendChild(li);
  });
}

function skip() {
  currentQuestionIndex++;
  if (currentQuestionIndex === quiz.length) {
    endGame();
    return;
  }
  showQuestion();
}

function checkAnswer(e) {
  const chosenAnswer = parseInt(e.target.dataset.index);
  const question = quiz[currentQuestionIndex];

  if (chosenAnswer === question.answer && timer !== 0) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === quiz.length) {
    endGame();
    return;
  }
  showQuestion();
}

function endGame() {
  clearInterval(timerInterval); // Clear the interval to stop the timer

  // Calculate the remaining time when the game ends
  const remainingTime = timer;

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  document.getElementById("score").innerText = score;
  timerEl.innerText = `Time left is: ${timer} seconds`;

  // Store player's name, score, and remaining time
  playerScores.push({ name: playerName, score: score, remainingTime: remainingTime }); 
  playerScores.sort((a, b) => b.score - a.score);

  // Save playerScores to localStorage
  localStorage.setItem("playerScores", JSON.stringify(playerScores));

  let rankingText = "Ranking:\n";
  playerScores.forEach((player, index) => {
    rankingText += `${index + 1}. ${player.name}: ${player.score} - Time Took to finnish: ${60 - player.remainingTime} s\n`;
  });
  rankingEl.innerText = rankingText;
}

// Event listener for clearing the ranking
clearButton.addEventListener("click", () => {
  accept = window.prompt("Are you sure you want to delete all scores? This action cannot be undone.");
  if (accept === "yes") {
    localStorage.removeItem("playerScores");
    playerScores = [];
    rankingEl.innerText = "Ranking has been cleared.";
  }
});

restartButton.addEventListener("click", () => {
  // Reset game variables
  playerName = "";
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;

  // Stop the timer if it's running
  clearInterval(timerInterval);
  timerInterval = null;

  // Reload playerScores from localStorage
  if (localStorage.getItem("playerScores")) {
    playerScores = JSON.parse(localStorage.getItem("playerScores"));
  }

  // Add the current player's data to the playerScores array if a name is provided
  if (playerName !== "") {
    playerScores.push({ name: playerName, score: score });
  }

  // Sort playerScores based on score
  playerScores.sort((a, b) => b.score - a.score);

  // Update the ranking display
  let rankingText = "Ranking:\n";
  playerScores.forEach((player, index) => {
    rankingText += `${index + 1}. ${player.name}: ${player.score}\n`;
  });
  rankingEl.innerText = rankingText;

  // Clear local storage
  localStorage.removeItem("playerScores");

  // Reset UI
  playerNameContainer.style.display = "block";
  startEl.style.display = "none";
  quizContainer.style.display = "none";
  resultContainer.style.display = "none";
  timerEl.innerText = timer;
});


showQuestion();
