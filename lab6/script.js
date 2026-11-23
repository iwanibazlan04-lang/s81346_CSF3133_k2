/* ---------- Questions Array ---------- */
const questions = [
  {
    question: "Which HTML tag is used to link an external CSS file?",
    options: ["<script>", "<link>", "<style>", "<css>"],
    answer: 1
  },
  {
    question: "Which CSS property changes the text colour of an element?",
    options: ["font-color", "text-style", "color", "foreground"],
    answer: 2
  },
  {
    question: "Which method selects an element by its id in JavaScript?",
    options: ["document.getElementById()", "document.query()", "document.findId()", "document.selectId()"],
    answer: 0
  },
  {
    question: "Which HTML element is the most suitable for the main heading of a page?",
    options: ["<head>", "<h6>", "<header-text>", "<h1>"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Scripts"],
    answer: 0
  },
  {
    question: "Which keyword declares a variable that cannot be reassigned in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "Which function runs a piece of code repeatedly at a fixed time interval?",
    options: ["setTimeout()", "setInterval()", "repeat()", "delay()"],
    answer: 1
  },
  {
    question: "Which operator checks both value AND type in JavaScript?",
    options: ["==", "=", "===", "!="],
    answer: 2
  }
];

/* ---------- Settings and state ---------- */
const TIME_LIMIT = 15;          // seconds per question
let shuffled = [];              // randomised copy of the questions
let currentIndex = 0;
let score = 0;
let answered = 0;               // number of questions already answered
let selectedIndex = null;
let timeLeft = TIME_LIMIT;
let timerId = null;
let locked = false;             // true once the current question is answered

/* ---------- Element references ---------- */
const startScreen  = document.getElementById("start-screen");
const quizScreen   = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressEl   = document.getElementById("progress");
const timerEl      = document.getElementById("timer");
const timerBar     = document.getElementById("timer-bar");
const questionEl   = document.getElementById("question-text");
const optionsEl    = document.getElementById("options");
const feedbackEl   = document.getElementById("feedback");
const submitBtn    = document.getElementById("submit-btn");
const nextBtn      = document.getElementById("next-btn");
const scoreEl      = document.getElementById("score");
const resultText   = document.getElementById("result-text");

/* ---------- shuffleQuestions(): Fisher-Yates shuffle ---------- */
function shuffleQuestions() {
  const copy = questions.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ---------- startTimer(): countdown for each question ---------- */
function startTimer() {
  clearInterval(timerId);
  timeLeft = TIME_LIMIT;
  updateTimerDisplay();

  timerId = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      checkAnswer(true);        // time is up
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = timeLeft;
  timerBar.style.width = (timeLeft / TIME_LIMIT) * 100 + "%";
  const low = timeLeft <= 5;
  timerEl.classList.toggle("low", low);
  timerBar.classList.toggle("low", low);
}

/* ---------- displayQuestion(): show question and options ---------- */
function displayQuestion() {
  const q = shuffled[currentIndex];
  locked = false;
  selectedIndex = null;

  progressEl.textContent = "Question " + (currentIndex + 1) + " of " + shuffled.length;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(function (text, i) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";

    const bubble = document.createElement("span");
    bubble.className = "bubble";
    bubble.textContent = String.fromCharCode(65 + i);   // A, B, C, D

    const label = document.createElement("span");
    label.textContent = text;                            // textContent keeps <tags> as plain text

    btn.append(bubble, label);
    btn.addEventListener("click", function () { selectOption(i); });
    optionsEl.appendChild(btn);
  });

  feedbackEl.className = "feedback hidden";
  feedbackEl.textContent = "";
  submitBtn.classList.remove("hidden");
  submitBtn.disabled = true;
  nextBtn.classList.add("hidden");
}

function selectOption(i) {
  if (locked) return;
  selectedIndex = i;
  Array.from(optionsEl.children).forEach(function (btn, idx) {
    btn.classList.toggle("selected", idx === i);
  });
  submitBtn.disabled = false;
}

/* ---------- checkAnswer(): mark the answer and update the score ---------- */
function checkAnswer(timedOut) {
  if (locked) return;
  locked = true;
  clearInterval(timerId);

  const q = shuffled[currentIndex];
  const buttons = Array.from(optionsEl.children);
  answered++;

  buttons.forEach(function (btn) {
    btn.disabled = true;
    btn.classList.remove("selected");
  });
  buttons[q.answer].classList.add("correct");

  if (!timedOut && selectedIndex === q.answer) {
    score++;
    showFeedback("Correct! Well done.", "correct");
  } else if (timedOut && selectedIndex === null) {
    showFeedback("Time's up! The correct answer is " + String.fromCharCode(65 + q.answer) + ".", "incorrect");
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    showFeedback("Incorrect. The correct answer is " + String.fromCharCode(65 + q.answer) + ".", "incorrect");
  }

  updateScore();
  submitBtn.classList.add("hidden");
  nextBtn.textContent = currentIndex === shuffled.length - 1 ? "See results" : "Next question";
  nextBtn.classList.remove("hidden");
  nextBtn.focus();
}

function showFeedback(message, type) {
  feedbackEl.textContent = message;
  feedbackEl.className = "feedback " + type;
}

function updateScore() {
  scoreEl.textContent = "Score: " + score + " / " + answered;
}

/* ---------- nextQuestion(): move on, reset timer, keep score ---------- */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < shuffled.length) {
    displayQuestion();
    startTimer();
    updateScore();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timerId);
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  const pct = Math.round((score / shuffled.length) * 100);
  resultText.textContent = "You scored " + score + " out of " + shuffled.length + " (" + pct + "%).";
  scoreEl.textContent = "Final score: " + score + " / " + shuffled.length;
}

/* ---------- startQuiz(): shuffle, show first question, start timer ---------- */
function startQuiz() {
  shuffled = shuffleQuestions();
  currentIndex = 0;
  score = 0;
  answered = 0;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  updateScore();
  displayQuestion();
  startTimer();
}

/* ---------- Event listeners ---------- */
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
submitBtn.addEventListener("click", function () { checkAnswer(false); });
nextBtn.addEventListener("click", nextQuestion);
