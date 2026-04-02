let userScore = 0,
  botScore = 0;
let gameOver = false;
let isPlaying = false;
const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };

function setButtonsDisabled(disabled) {
  document.querySelectorAll(".btn").forEach((b) => (b.disabled = disabled));
}

function startRound(userChoice) {
  if (gameOver || isPlaying) return;
  isPlaying = true;
  let count = 3;
  const countdownEl = document.getElementById("countdown");
  countdownEl.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = count;
    } else {
      countdownEl.textContent = "GO!";
      clearInterval(interval);
      setTimeout(() => play(userChoice), 300);
    }
  }, 400);
}

function play(userChoice) {
  if (gameOver) return;

  const choices = ["rock", "paper", "scissors"];
  const botChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById("playerPick").textContent = emojis[userChoice];
  document.getElementById("botPick").textContent = emojis[botChoice];

  const resultDiv = document.getElementById("result");
  resultDiv.className = "result";

  let result = "";

  if (userChoice === botChoice) {
    result = "Draw!";
    resultDiv.classList.add("draw");
  } else if (
    (userChoice === "rock" && botChoice === "scissors") ||
    (userChoice === "paper" && botChoice === "rock") ||
    (userChoice === "scissors" && botChoice === "paper")
  ) {
    result = "You Win!";
    userScore++;
    document.getElementById("userScore").textContent = userScore;
    resultDiv.classList.add("win");
    document.getElementById("winSound").play();
  } else {
    result = "You Lose!";
    botScore++;
    document.getElementById("botScore").textContent = botScore;
    resultDiv.classList.add("lose");
    document.getElementById("loseSound").play();
  }

  if (userScore === 5 || botScore === 5) {
    gameOver = true;
    setButtonsDisabled(true);

    if (userScore === 5) {
      resultDiv.textContent = "🏆 You reached 5! You WIN the game!";
      resultDiv.className = "result win";
    } else {
      resultDiv.textContent = "😂 The bot is laughing at you right now.";
      resultDiv.className = "result lose";
    }
    return;
  }

  resultDiv.textContent = result;

  isPlaying = false;
}

function resetGame() {
  userScore = 0;
  botScore = 0;
  gameOver = false;
  isPlaying = false;
  document.getElementById("userScore").textContent = 0;
  document.getElementById("botScore").textContent = 0;
  document.getElementById("playerPick").textContent = "?";
  document.getElementById("botPick").textContent = "?";
  document.getElementById("result").textContent = "Game reset!";
  document.getElementById("countdown").textContent = "VS";
  setButtonsDisabled(false);
}
