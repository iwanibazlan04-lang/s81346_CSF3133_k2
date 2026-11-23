// ===== Global variables =====
var gameStarted = false;           // has the player clicked Start Game?
var playerName = "";
var wins = 0, losses = 0, draws = 0;
var results = [];                  // stores "Win", "Lose", "Draw" for every round

// ===== startGame(): read name, validate, welcome, show start time =====
function startGame() {
  var name = document.getElementById("playerName").value.trim();
  if (name === "") {
    alert("Please enter your name.");
    return;                        // stop here if name is empty
  }
  playerName = name;
  document.getElementById("welcome").innerHTML = "Welcome, " + playerName + "!";
  document.getElementById("startTime").innerHTML = "Game started: " + new Date().toLocaleString();
  gameStarted = true;              // allow the game to start
}

// ===== getComputerChoice(): random choice from an array =====
function getComputerChoice() {
  var choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// ===== playRound(playerChoice): play one round =====
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }
  var computerChoice = getComputerChoice();
  var outcome;

  // Decide the result with if...else
  if (playerChoice === computerChoice) {
    outcome = "Draw";
  } else if ((playerChoice === "rock" && computerChoice === "scissors") ||
             (playerChoice === "scissors" && computerChoice === "paper") ||
             (playerChoice === "paper" && computerChoice === "rock")) {
    outcome = "Win";
  } else {
    outcome = "Lose";
  }

  // Change the images
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  // Show result and change its colour
  var resultEl = document.getElementById("result");
  resultEl.innerHTML = "You " + outcome + "!";
  if (outcome === "Win") {
    resultEl.style.color = "green";
  } else if (outcome === "Lose") {
    resultEl.style.color = "red";
  } else {
    resultEl.style.color = "grey";
  }

  // Update the score
  if (outcome === "Win") { wins++; }
  else if (outcome === "Lose") { losses++; }
  else { draws++; }
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  // Store result and add a new row to the history table
  results.push(outcome);
  document.getElementById("historyBody").innerHTML +=
    "<tr><td>" + results.length + "</td><td>" + playerChoice +
    "</td><td>" + computerChoice + "</td><td>" + outcome + "</td></tr>";
}

// ===== showSummary(): count wins with a for loop, show percentage =====
function showSummary() {
  var total = results.length;
  var winCount = 0;
  for (var i = 0; i < total; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }
  var percent = total === 0 ? 0 : Math.round((winCount / total) * 100);
  var resultEl = document.getElementById("result");
  resultEl.style.color = "black";
  resultEl.innerHTML = "You played " + total + " rounds and won " + percent + "%.";
}

// ===== resetGame(): set everything back to the start =====
function resetGame() {
  wins = 0; losses = 0; draws = 0;
  results = [];
  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;
  document.getElementById("historyBody").innerHTML = "";   // clear history rows
  document.getElementById("result").innerHTML = "";        // clear result message
  document.getElementById("playerImg").src = "rock.png";
  document.getElementById("computerImg").src = "rock.png";
}
