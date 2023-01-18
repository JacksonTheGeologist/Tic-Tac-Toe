//HTML Elements
const gameSquares = document.querySelectorAll('.game-square');
const playerTurn = document.querySelector('.player-turn');
const winner = document.querySelector('.winner');
const gameBoard = document.querySelector('.game-board');
const headerInfoEl = document.querySelector('.header-info');
const gameResetBtn = document.querySelector('.game-reset');
const gameStartBtn = document.querySelector('.game-start');
const playerOscoreMarkersP = document.querySelector('.score-markers--playerO');
const playerXscoreMarkersP = document.querySelector('.score-markers--playerX');
const numPlayersToggle = document.querySelector('.checkbox');
const numPlayersTextP = document.querySelector('.number-players-text');

//Game Pieces
let playerSymb = 'X';
let winnerSymb = 'X';
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
let xScore = 0;
let oScore = 0;
let numPlayers = 2;
let turn = 0;
let winnerState = false;
function randSquare() {
  return Math.floor(Math.random() * 9);
}
// toggle number of players function
const addHiddenEl = function (el) {
  el.classList.add('hidden');
};

// Math.floor(Math.random() * max);
function togglePlayers() {
  numPlayers = numPlayersToggle.checked ? 2 : 1;
  numPlayersTextP.textContent = `${numPlayers} players`;
}
numPlayersToggle.addEventListener(touchEvent, togglePlayers);

let empties = 9;
function checkWinner() {
  empties--;
  console.log(empties);
  if (
    gameSquares[0].textContent &&
    gameSquares[0].textContent === gameSquares[1].textContent &&
    gameSquares[0].textContent === gameSquares[2].textContent
  ) {
    winnerText(gameSquares[0]);
  } else if (
    gameSquares[0].textContent &&
    gameSquares[0].textContent === gameSquares[3].textContent &&
    gameSquares[0].textContent === gameSquares[6].textContent
  ) {
    winnerText(gameSquares[0]);
  } else if (
    gameSquares[0].textContent &&
    gameSquares[0].textContent === gameSquares[4].textContent &&
    gameSquares[0].textContent === gameSquares[8].textContent
  ) {
    winnerText(gameSquares[0]);
  } else if (
    gameSquares[0].textContent &&
    gameSquares[0].textContent === gameSquares[4].textContent &&
    gameSquares[0].textContent === gameSquares[8].textContent
  ) {
    winnerText(gameSquares[0]);
  } else if (
    gameSquares[1].textContent &&
    gameSquares[1].textContent === gameSquares[4].textContent &&
    gameSquares[1].textContent === gameSquares[7].textContent
  ) {
    winnerText(gameSquares[1]);
  } else if (
    gameSquares[2].textContent &&
    gameSquares[2].textContent === gameSquares[5].textContent &&
    gameSquares[2].textContent === gameSquares[8].textContent
  ) {
    winnerText(gameSquares[2]);
  } else if (
    gameSquares[3].textContent &&
    gameSquares[3].textContent === gameSquares[4].textContent &&
    gameSquares[3].textContent === gameSquares[5].textContent
  ) {
    winnerText(gameSquares[3]);
  } else if (
    gameSquares[6].textContent &&
    gameSquares[6].textContent === gameSquares[7].textContent &&
    gameSquares[6].textContent === gameSquares[8].textContent
  ) {
    winnerText(gameSquares[6]);
  } else if (
    gameSquares[6].textContent &&
    gameSquares[6].textContent === gameSquares[4].textContent &&
    gameSquares[6].textContent === gameSquares[2].textContent
  ) {
    winnerText(gameSquares[6]);
  } else if (empties === 0) {
    console.log('hi');
    draw();
  }
}

function winnerText(playerID) {
  winner.classList.remove('hidden');
  winnerState = true;
  winnerSymb = playerID.textContent;

  if (winnerSymb === 'X') {
    xScore += 1;

    playerXscoreMarkersP.textContent = '🔴 '.repeat(xScore);
  } else {
    oScore += 1;
    playerOscoreMarkersP.textContent = '🔵 '.repeat(oScore);
  }

  playerTurn.textContent = `${playerID.textContent} is the winner!`;
}

// gameStartBtn.addEventListener(touchEvent, function () {
//   headerInfoEl.classList.add('opacity-transition');
// });
// // gameStartBtn.addEventListener(makeSqrsWork);
// gameStartBtn.addEventListener(touchEvent, function () {
//   setTimeout(function () {
//     addHiddenEl(headerInfoEl);
//   }, 500);
// // });
// //Creates winner text string and displays it

//Resets the Game
const resetGame = function () {
  playerTurn.textContent = `${winnerSymb} makes the first move!`;
  gameResetBtn.classList.add('hidden');
  setTimeout(function () {
    for (i = 0; i < gameSquares.length; i++) {
      gameSquares[i].textContent = '';
      // playerSymb = 'X';
      playerSymb = winnerSymb;
      gameSquares[i].classList.remove('no-hover');
      empties = 9;
    }
  }, 40);

  setTimeout(function () {
    winner.classList.add('opacity-transition');
  }, 1000);
  turn = 0;
};

// GAME LOGIC
function draw() {
  winner.classList.remove('hidden');
  playerTurn.textContent = 'Draw!';
}

gameResetBtn.addEventListener(touchEvent, resetGame);
gameResetBtn.addEventListener(touchEvent, function () {
  setTimeout(function () {
    addHiddenEl(winner);
    winner.classList.remove('opacity-transition');
    gameResetBtn.classList.remove('hidden');
  }, 1500);
});
