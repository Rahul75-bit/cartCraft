let userScore = 0;
let compScore = 0;
let drawScore = 0;
let gameOver = false;

const winLimit = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const drawScorePara = document.querySelector("#tie-score");

// Generate computer choice
const gencompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Update draw score
const updateDrawScore = () => {
  drawScore++;
  drawScorePara.innerText = drawScore;
};

// Handle draw
const drawGame = (userChoice, compChoice) => {
  updateDrawScore();
  msg.innerText = `Draw! Both chose ${userChoice}`;
};

// Show round result
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;

    if (userScore === winLimit) {
      endGame("You");
    }
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;

    if (compScore === winLimit) {
      endGame("Computer");
    }
  }
};

// End the game
const endGame = (winner) => {
  msg.innerText = `${winner} wins the game! 🎉 Game Over.`;

  gameOver = true;

  // Disable clicks
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none";
  });
};

// Main play function
const playGame = (userChoice) => {
  if (gameOver) return;

  const compChoice = gencompChoice();

  if (userChoice === compChoice) {
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      //scissor, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissor
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // rock , paper
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }
};

// Click listeners for choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Reset Button
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  drawScore = 0;
  gameOver = false;

  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  drawScorePara.innerText = drawScore;

  msg.innerText = "Play Your Move";

  // Re-enable choices
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto";
  });
});
