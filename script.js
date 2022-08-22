'use strict';
// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;
const init = function () {
  // Initial conditions
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // 1.- Set scores to 0 (reset all initial conditions)
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
// Start game
init();
// Switch players
const switchPlayerFunc = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// ------------------------
// Rolling the dice
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // 1.- Generate randome dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.- Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.- Check for rolled dice no. 1. If true, switch player
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Change player and reset score
      switchPlayerFunc();
    }
  }
});

//  ------------------------
// Hold the score
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    // 1.- Add current score to total score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2.- Check if score < 100
    if (score[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player
      switchPlayerFunc();
    }
  }
});

//  -----------------------
// Reseting the game
btnNewEl.addEventListener('click', init);
