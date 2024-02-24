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
let quiz = null;
const subjectColors = {
  Math: `url('image.jpg')`, 
  PC: `url('pc.jpg')`,
  Informatique: `url('inf.jpg')`,
  Francais: `url('fr.jpg')`,
  Anglais: `url('en.jpg')`,
  Svt: `url('svt.jpg')`
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
    choices: ["(√cos⁻¹)²+4⁄π", "0", "2", "Pas de solution"],
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
    question: "Un exemple d'un récepteur de lumière",
    choices: ["l'œil", "les mains ", "la table", "la tête"],
    answer: 0,
  },

  {
    question: "Une substance naturelle sont celles...",
    choices: ["obtenues dans les laboratoires", "qui existent dans la nature", "qui sont identiques à celles de la nature", "Les trois derniers suggestions sont fausses"],
    answer: 1,
  },

  {
    question: "Un exemple d'une substance artificielle",
    choices: ["le sucre", "le lait", "le sel", "le nylon"],
    answer: 3,
  },

  {
    question: "Le pétrole est une matière ...",
    choices: ["synthétique", "fabriquer", "naturel", "Les trois derniers suggestions sont fausses"],
    answer: 2,
  },
];
const quizInformatique = [
  {
    question: "La fonction append() est utiliser pour...",
    choices: ["Supprimer", "Mise a jour", "répeter", "ajouter"],
    answer: 3,
  },

  {
    question: "Comment créer une liste?",
    choices: ["liste = []", "liste = {}", "liste = ()", `"liste = ""`],
    answer: 0,
  },

  {
    question: "Créer une fonction c'est avec le mot clé...",
    choices: ["def", "for", "while", "input"],
    answer: 0,
  },

  {
    question: "Indiqué une égaliter sur deux variables c'est avec...",
    choices: ["<=", "!=", "==", ">="],
    answer: 2,
  },

  {
    question: "La fonction len()...",
    choices: ["reçoie le texte de l'utilisateur", "reçoie le nombre des éléments", "envoie le texte de l'utilisateur", "les trois dernieres suggestions sont fausses"],
    answer: 3,
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
    question: "The verb read in the past",
    choices: ["red", "rad", "rud", "read"],
    answer: 3,
  },

  {
    question: "Cast...",
    choices: ["all the actors in a film", "The main story", "the part of an actor", "words for a play"],
    answer: 0,
  },

  {
    question: "Report...",
    choices: ["People", "Articles", "News", "An email"],
    answer: 2,
  },

  {
    question: "The verb play in the past continuous",
    choices: ["played", "was playing", "is playing", "has been played"],
    answer: 1,
  },

  {
    question: "Where people go to borrow books...",
    choices: ["Library", "Bank", "Bridge", "Museum"],
    answer: 0,
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
    timeProgress.style.backgroundColor = "#4CAF50";
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
  quizContainer.style.backgroundImage = `url('image.jpg')`;
  quizContainer.style.backgroundRepeat = 'no-repeat';
  quizContainer.style.backgroundSize = 'cover';
  quizContainer.style.backgroundPosition = 'center';
  quizContainer.style.backgroundAttachement = 'fixed';
  document.body.style.backgroundImage = `url('image.jpg')`;
  start();
});

pc.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "PC"; 
  quizContainer.style.backgroundImage = `url('pc.jpg')`;
  quizContainer.style.backgroundRepeat = 'no-repeat';
  quizContainer.style.backgroundSize = 'cover';
  quizContainer.style.backgroundPosition = 'center';
  quizContainer.style.backgroundAttachement = 'fixed';
  document.body.style.backgroundImage = `url('pc.jpg')`;
  quiz = quizPc;
  start();
});

informatique.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Informatique"; 
  quizContainer.style.backgroundImage = `url('inf.jpg')`;
  quizContainer.style.backgroundRepeat = 'no-repeat';
  quizContainer.style.backgroundSize = 'cover';
  quizContainer.style.backgroundPosition = 'center';
  quizContainer.style.backgroundAttachement = 'fixed';
  document.body.style.backgroundImage = `url('inf.jpg')`;
  quiz = quizInformatique;
  start();
});

francais.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Francais"; 
  quizContainer.style.backgroundImage = `url('fr.jpg')`;
  quizContainer.style.backgroundRepeat = 'no-repeat';
  quizContainer.style.backgroundSize = 'cover';
  quizContainer.style.backgroundPosition = 'center';
  quizContainer.style.backgroundAttachement = 'fixed';
  document.body.style.backgroundImage = `url('fr.jpg')`;
  quiz = quizFrancais;
  start();
});

anglais.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Anglais"; 
  quizContainer.style.backgroundImage = `url('en.jpg')`;
  quizContainer.style.backgroundRepeat = 'no-repeat';
  quizContainer.style.backgroundSize = 'cover';
  quizContainer.style.backgroundPosition = 'center';
  quizContainer.style.backgroundAttachement = 'fixed';
  document.body.style.backgroundImage = `url('en.jpg')`;
  quiz = quizAnglais;
  start();
});

svt.addEventListener("click", function() {
  clearSelectedSubject();
  selectedSubject = "Svt"; 
  quizContainer.style.backgroundImage = `url('svt.jpg')`;
  quizContainer.style.backgroundRepeat = 'no-repeat';
  quizContainer.style.backgroundSize = 'cover';
  quizContainer.style.backgroundPosition = 'center';
  quizContainer.style.backgroundAttachement = 'fixed';
  document.body.style.backgroundImage = `url('svt.jpg')`;
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



function handleDefaultSubject() {
  if (!selectedSubject) {
    selectedSubject = "Informatique";
    quiz = quizInformatique;
    quizContainer.style.backgroundImage = `url('inf.jpg')`;
    quizContainer.style.backgroundRepeat = 'no-repeat';
    quizContainer.style.backgroundSize = 'cover';
    quizContainer.style.backgroundPosition = 'center';
    quizContainer.style.backgroundAttachement = 'fixed';
    document.body.style.backgroundImage = `url('inf.jpg')`;
  }
}


function start() {
  handleDefaultSubject(); // Check for default subject
  document.getElementById("start").style.display = "none"; // Hide the start button
  document.getElementById("label").style.display = "block";
  document.getElementById("subject-buttons").style.display = "block";
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
  document.getElementById("form").style.display = "none";
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

function displayRanking() {
  let rankingText = "Le classement:\n";
  playerScores.sort((a, b) => b.score - a.score); // Sort playerScores based on scores
  playerScores.forEach((player, index) => {
    const displayName = index === 0 ? `${player.name} 👑` : player.name; 
    rankingText += `${index + 1}. ${displayName}: ${player.score} | Il a fallu du temps pour finir: ${60 - player.remainingTime}s | matière: ${player.selectedSubject}\n`;
  });
  rankingEl.innerText = rankingText;
}

function endGame() {
  clearInterval(timerInterval); // Clear the interval to stop the timer
  timerSound.pause();
  // Calculate the remaining time when the game ends
  const remainingTime = timer;
  document.getElementById("form").style.display = "none"; 
  quizContainer.style.display = "none";
  document.body.style.height = "10vh";
  resultContainer.style.display = "block";
  document.getElementById("score").innerText = score;
  timerEl.innerText = `Le temps restant est: ${timer} seconds`;

  // Store player's name, score, and remaining time
  playerScores.push({ name: playerName, score: score, remainingTime: remainingTime, selectedSubject: selectedSubject}); 
  playerScores.sort((a, b) => b.score - a.score);
  
  // Save playerScores to localStorage
  localStorage.setItem("playerScores", JSON.stringify(playerScores));
  localStorage.setItem("playerSubjects", JSON.stringify(playerScores));

  let rankingText = "Le classement:\n";
  playerScores.forEach((player, index) => {
    rankingText += `${index + 1}- ${player.name}: ${player.score} | Il a fallu du temps pour finir: ${60 - player.remainingTime}s | matière: ${player.selectedSubject}\n`;
  });
  rankingEl.innerText = rankingText;
}

// Event listener for clearing the ranking
clearButton.addEventListener("click", () => {
  let accept = window.prompt("Êtes-vous sûr de vouloir supprimer tous les scores? Cette action ne peut pas être annulée. Tapez 'oui' pour confirmer.");

  // Vérifie si l'utilisateur confirme en tapant "oui"
  if (accept === "oui") {
    localStorage.removeItem("playerScores");
    localStorage.removeItem("playerSubjects");
    playerScores = [];
    rankingEl.innerText = "Les scores ont été effacés.";
  } else if (accept === "non" || accept === null) { // Vérifie si l'utilisateur annule ou tape "non"
    alert('Les scores ne seront pas effacés.');
  } else { // Gère une entrée invalide
    alert('Veuillez taper "oui" pour confirmer ou annuler pour conserver les scores.');
  }
});



restartButton.addEventListener("click", () => {
  // Reset game variables
  playerName = "";
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;

  // Hide the result container
  resultContainer.style.display = "none";

  // Hide the quiz container
  quizContainer.style.display = "none";

  // Clear the timer text
  timerEl.textContent = "";

  // Hide the progress bar
  bar.style.display = "none";

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
  timerEl.innerText = timer;
  timerEl.style.display = "none";
  document.getElementById("form").style.display = "block"; // Show the form
  quizContainer.style.backgroundImage = `linear-gradient(45deg, orange, red)`;
  document.body.style.backgroundImage = `linear-gradient(45deg, orange, red)`;

  // Set the default subject to "Informatique"
  selectedSubject = "Informatique";
  quiz = quizInformatique;
  quizContainer.style.backgroundImage = `url('inf.jpg')`;
  quizContainer.style.backgroundRepeat = 'no-repeat';
  quizContainer.style.backgroundSize = 'cover';
  quizContainer.style.backgroundPosition = 'center';
  quizContainer.style.backgroundAttachement = 'fixed';
  document.body.style.backgroundImage = `url('inf.jpg')`;

  // Show the quiz form
  document.getElementById("quiz-form").style.display = "block";

  // Start the quiz immediately
  setPlayerName();
});


let timerSound = new Audio("0223.MP3");

setInterval(() => {
  if(timer <= 10 && timer !== 0 && currentQuestionIndex !== quiz.length) {
    timerSound.play();
  } 
  if(timer >= 10) {
    timerSound.pause();
  }
  if(timer == 0) {
    timerSound.pause();

}
},100)

// Define the function to return to the previous question
function returnToPreviousQuestion() {
  // Decrement currentQuestionIndex to go back to the previous question
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  } else {
    alert("You are already at the first question!");
  }
}


document.querySelectorAll('.subject-button').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the button
    // Your code to handle the subject selection goes here
  });
});
