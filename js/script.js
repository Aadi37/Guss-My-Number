"use strict";

const numberField = document.getElementById('number');
const submitBtn = document.getElementById('SubmitBtn');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const gussnumberField = document.querySelector('.GussNumberField');
const errorMsg = document.getElementById('error');
const winnerWrapper = document.querySelector('.winner');
const lastscroe = document.querySelector('.lastscroe');
const playAgainBtn = document.querySelector('.againBtn .btn');
let intailScore = 10;

// ✅ Load highscore from localStorage (if available)
let highScoreValue = localStorage.getItem('highscore') 
    ? Number(localStorage.getItem('highscore')) 
    : 0;
highscore.textContent = highScoreValue;

// ✅ Generate random number from 1 to 10
let randomNumber = Math.floor(Math.random() * 10) + 1;

// ✅ Input validation (number must be 1–10)
numberField.addEventListener('input', () => {
  if (Number(numberField.value) > 10 || Number(numberField.value) < 1) {
    errorMsg.style.display = 'block';
  } else {
    errorMsg.style.display = 'none';
  }
});

// ✅ Form submit handler
const fromSubmit = (e) => {
  e.preventDefault();
  
  const userGuess = Number(numberField.value);
  if (!userGuess || userGuess < 1 || userGuess > 10) return;

  if (userGuess === randomNumber) {
    intailScore++;
    gussnumberField.textContent = randomNumber;
    lastscroe.textContent = `Your Score: ${intailScore}`;
    winnerWrapper.classList.add('active');
    document.body.classList.add('blur');
    
    // ✅ Update highscore if needed
    if (intailScore > highScoreValue) {
      highScoreValue = intailScore;
      localStorage.setItem('highscore', highScoreValue);
      highscore.textContent = highScoreValue;
    }
  } else {
    intailScore--;
    score.textContent = intailScore;
    if (intailScore <= 0) {
      document.querySelector('.message').textContent = '💥 You lost the game!';
      submitBtn.disabled = true;
    }
  }
  score.textContent = intailScore;
};

// ✅ Reset game on “Play Again”
playAgainBtn.addEventListener('click', () => {
  intailScore = 5;
  score.textContent = intailScore;
  randomNumber = Math.floor(Math.random() * 10) + 1;

  numberField.value = '';
  gussnumberField.textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  submitBtn.disabled = false;
  
  winnerWrapper.classList.remove('active');
  document.body.classList.remove('blur');
});
