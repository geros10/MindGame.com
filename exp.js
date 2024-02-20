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
const clearPlayer = document.getElementById("clear-player");
const restartButton = document.getElementById("restart-button");
const timeProgress = document.querySelector(".time-progress");
const bar = document.getElementById("bar");
const math = document.getElementById("math");
const pc = document.getElementById("pc");
const informatique = document.getElementById("informatique");
const francais = document.getElementById("francais");
const anglais = document.getElementById("anglais");
const svt = document.getElementById("svt");
const submit = document.getElementById("submit");
const subjectColors = {
  Math: 'linear-gradient(45deg, blue, cyan)',
  PC: 'linear-gradient(45deg, green, greenyellow)',
  Informatique: 'linear-gradient(45deg, red, yellow)',
  Francais: 'linear-gradient(45deg, pink, purple)',
  Anglais: 'linear-gradient(45deg, yellow, black)',
  Svt: 'linear-gradient(45deg, brown, yellow)'
};

let selectedSubject = null;

const quizMath = [
  {
    question: "L'orthocentre c'est le point de rencontre de ...",
    choices: ["trois médiatrices", "trois medianes", "trois bissectrices", "trois hauteurs"],
    answer: 3,
  },

  {
    question: "Le carre parfait de 81 est ...",
    choices: ["5²", "8²", "9²", "12²"],
    answer: 2,
  },

  {
    question: "La developpement est rendre...",
    choices: ["un somme à une multiplication", "une multiplication à un somme", "La pissance de diviseur", "addition avec puissance"],
    answer: 0,
  },

  {
    question: "6÷2(1+2) = ?",
    choices: ["1", "5", "9", "6"],
    answer: 2,
  },

  {
    question: "Quelle est la solution de cette équation (x-1)² +1 = (x-1)² -1",
    choices: ["(√cos⁻¹)²+4⁄π", "0", "2", "impossible"],
    answer: 3,
  },
];
const quizPc = [
  {
    question: "Un exemple d'une source primaire",
    choices: ["Le Soleil", "La lune", "La terre", "Venus"],
    answer: 0,
  },

  {
    question: "Bruh?",
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
const quizInformatique = [
  {
    question: "C'est quoi le résultat de cette ?",
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
const quizFrancais = [
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
const quizSvt = [
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
const quizAnglais = [
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


let timerInterval = null;
let playerName = "";
let currentQuestionIndex = 0;
let score = 0;
let timer = 60;
let playerScores = [];


document.getElementById('submit').addEventListener('click', function() {
  document.getElementById('quiz-form').style.display = 'none';
});

setInterval(() => {
  if (timer !== 0) {
    const increment = 100 / 60; // Assuming the timer is set to 60 seconds
    const newWidth = Math.max(100 - (timer * increment), 0); // Calculate the new width
    timeProgress.style.width = newWidth + "%"; // Set the width of the progress bar
  }
}, 1000);

setInterval(() => {
  if (timer <= 30) {
    timeProgress.style.backgroundColor = "yellow";
    timerEl.style.color = "black";
  }  
  if (timer <= 10) {
    timeProgress.style.backgroundColor = "red";
    timerEl.style.color ="white";
  }  
  if (timer >= 30) {
    timeProgress.style.backgroundColor = "green";
    timerEl.style.color ="white";
  }  
}, 5)

document.getElementById("restart-button").addEventListener("click", function() {
  // Hide the timer when the restart button is clicked
  document.getElementById("timer").style.visibility = "hidden";
});
// Load playerScores from localStorage on page load
if (localStorage.getItem("playerScores")) {
  playerScores = JSON.parse(localStorage.getItem("playerScores"));
}

if (localStorage.getItem("playerSubjects")) {
  playerScores = JSON.parse(localStorage.getItem("playerSubjects"));
}

document.getElementById("submit").addEventListener("click", function() {
  // Hide the timer when the restart button is clicked
  bar.style.display = "block";
});


// Add event listeners to subject buttons
math.addEventListener("click", function() {
  clearSelectedSubject();
  quiz = quizMath;
  selectedSubject = "Math"; 
  quizContainer.style.backgroundImage = `linear-gradient(45deg, blue, cyan)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, blue, cyan)`;
  start();
});

pc.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "PC"; 
  quizContainer.style.backgroundImage = `linear-gradient(45deg, green, greenyellow)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, green, greenyellow)`;
  quiz = quizPc;
  start();
});

informatique.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Informatique"; 
  quizContainer.style.backgroundImage = `linear-gradient(45deg, red, yellow)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, red, yellow)`;
  quiz = quizInformatique;
  start();
});

francais.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Francais"; 
  quizContainer.style.backgroundImage = `linear-gradient(45deg, pink, purple)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, pink, purple)`;
  quiz = quizFrancais;
  start();
});

anglais.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Anglais"; 
  quizContainer.style.backgroundImage = `linear-gradient(45deg, yellow, black)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, yellow, black)`;
  quiz = quizAnglais;
  start();
});

svt.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Svt"; 
  quizContainer.style.backgroundImage = `linear-gradient(45deg, brown, yellow)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, brown, yellow)`;
  quiz = quizSvt;
  start();
});

function clearSelectedSubject() {
  selectedSubject = null;
}


// Update showQuestion() function to use selected quiz array
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

// Modify ranking display to sort playerScores based on scores before displaying
function displayRanking() {
  let rankingText = "Ranking:\n";
  playerScores.sort((a, b) => b.score - a.score); // Sort playerScores based on scores
  playerScores.forEach((player, index) => {
    rankingText +=  `${index + 1}. ${player.name}: ${player.score}\n `;
  });
  rankingEl.innerText = rankingText;
}

function handleDefaultSubject() {
  if (!selectedSubject) {
    selectedSubject = "Informatique";
    quiz = quizInformatique;
    quizContainer.style.backgroundImage = `linear-gradient(45deg, red, yellow)`; // Adjust background color if needed
    document.body.style.backgroundImage = `linear-gradient(45deg, red, yellow)`; // Adjust background color if needed
  }
}


function start() {
  handleDefaultSubject(); // Check for default subject
  document.getElementById("start").style.display = "none"; // Hide the start button
  document.getElementById("player-name-container").style.display = "block"; // Show the player name container
  document.getElementById("timer").style.visibility = "visible"; // Show the timer
  document.getElementById("quiz-form").style.display = "block"; // Show the quiz form
}


function setPlayerName() {
  playerName = playerNameInput.value;
  if(playerName === ""){
    playerName = "random";
  }
  playerNameContainer.style.display = "none";
  quizContainer.style.display = "block";
  timerEl.innerText = timer;
  document.getElementById("timer").style.visibility = "visible";
  timerInterval = setInterval(() => { // Utilisez la variable globale timerInterval
    if (timer > 0) {
      timer--;
      timerEl.innerText = timer;
      timerEl.style.display = "block";
    } else {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
  showQuestion();
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
  let correctAudio = new Audio("myinstants2.mp3");
  let falseAudio = new Audio("myinstants3.mp3");

  if (chosenAnswer === question.answer && timer !== 0) {
    score++;
    correctAudio.play();
    // Change background color based on selected subject
    quizContainer.style.backgroundImage = `linear-gradient(45deg, green, green)`;
    setTimeout(() => {
      // Return to original background color after 1 second
      quizContainer.style.backgroundImage = subjectColors[selectedSubject];
      currentQuestionIndex++;
      if (currentQuestionIndex === quiz.length) {
        endGame();
        return;
      }
      showQuestion();
    }, 1000);
  } else {
    falseAudio.play();
    // Change background color based on selected subject
    quizContainer.style.backgroundImage = `linear-gradient(45deg, red, red)`;
    setTimeout(() => {
      // Return to original background color after 1.5 seconds
      quizContainer.style.backgroundImage = subjectColors[selectedSubject];
      currentQuestionIndex++;
      if (currentQuestionIndex === quiz.length) {
        endGame();
        return;
      }
      showQuestion();
    }, 1500);
  }
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
  playerScores.push({ name: playerName, score: score, remainingTime: remainingTime, selectedSubject: selectedSubject}); 
  playerScores.sort((a, b) => b.score - a.score);
  
  // Save playerScores to localStorage
  localStorage.setItem("playerScores", JSON.stringify(playerScores));
  localStorage.setItem("playerSubjects", JSON.stringify(playerScores));

  let rankingText = "Ranking:\n";
  playerScores.forEach((player, index) => {
    rankingText += `${index + 1}- ${player.name}: ${player.score} | Time Took to finnish: ${60 - player.remainingTime}s | subject: ${player.selectedSubject}\n`;
  });
  rankingEl.innerText = rankingText;
}

// Event listener for clearing the ranking
clearButton.addEventListener("click", () => {
  accept = window.prompt("Are you sure you want to delete all scores? This action cannot be undone.");
  if (accept === "yes") {
    localStorage.removeItem("playerScores");
    localStorage.removeItem("playerSubjects");
    playerScores = [];
    rankingEl.innerText = "Ranking has been cleared.";
  } else if (accept === "") {
    while(accept === ""){
      accept = window.prompt('Please enter yes or no');
    }
    if(accept !== "yes"){
      alert('Scores will not be cleared.');
    }else if(accept === "yes") {
      localStorage.removeItem("playerScores");
      localStorage.removeItem("playerSubjects");
      playerScores = [];
      rankingEl.innerText = "Ranking has been cleared.";
    }
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
  timerEl.style.display = "none";
  document.getElementById("quiz-form").style.display = "block";
  bar.style.display = "none";
  quizContainer.style.backgroundImage = `linear-gradient(45deg, orange, red)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, orange, red)`;
});


showQuestion();
