const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game - API res in array
words = [
  "gold",
  "silver",
  "bronze",
  "platinum",
  "diomand",
  "cat",
  "dog",
  "parrot",
  "apple",
  "strawberry"
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in LS or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Start timer countdown
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // End game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endGameEl.innerHTML = `
    <h1>Game Over<h1/>
    <p>Your Final Score Is ${score}</p>
    <button onClick="location.reload()">Reload</button>
  `;
  endGameEl.style.display = "flex";
}

// addWordToDOM();

// Event Listeners

// Typing
text.addEventListener("input", e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = "";

    // Update time
    switch (difficulty) {
      case "easy":
        time += 5;
        break;
      case "medium":
        time += 3;
        break;
      case "hard":
        time += 2;
        break;
    }

    // if (difficulty === "hard") {
    //   time += 2;
    // } else if (difficulty === "medium") {
    //   time += 3;
    // } else if (difficulty === "easy") {
    //   time += 5;
    // }
    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Settings select
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
