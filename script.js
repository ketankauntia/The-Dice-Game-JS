'use strict';

let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Scoping
let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;

  playing = true;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.add('player--active');

  current0El.textContent = 0;
  current1El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
};
init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random dice roll

    //   const dice = Math.trunc(Math.random() * 7);
    //will give error as it can output 0 sometimes.

    const dice = Math.trunc(Math.random() * 6) + 1;

    //   console.log(dice);

    //2. Display the dice
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${dice}.png`;

    //3. Check wether the no is 1. if true : transfer to the other player.

    if (dice !== 1) {
      //add current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch the player

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the player's existing score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 15) {
      //2. if score > 100 player wins
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      //else, switch to other player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
