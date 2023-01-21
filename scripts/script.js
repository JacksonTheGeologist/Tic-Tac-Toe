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
let winnerState = false;
let empties = 9;
const possibleWins = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// let winnerState = false;
function randSquare() {
  return Math.floor(Math.random() * 9);
}

// toggle number of players function
const addHiddenEl = function (el) {
  el.classList.add('hidden');
};

function squaresPause() {
  for (let i = 0; i < gameSquares.length; i++) {
    gameSquares[i].classList.add('comp-pause');
  }
}

function squaresStart() {
  for (let i = 0; i < gameSquares.length; i++) {
    gameSquares[i].classList.remove('comp-pause');
  }
}

function winnerText(playerID) {
  winner.classList.remove('opacity-transition');
  gameResetBtn.classList.remove('hidden');
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

function draw() {
  winner.classList.remove('opacity-transition');
  gameResetBtn.classList.remove('hidden');
  winner.classList.remove('hidden');
  playerTurn.textContent = 'Draw!';
}
// winner.classList.remove('opacity-transition');
// for (let i = 0; i < gameSquares.length; i++) {
//   gameSquares[i].remove('no-hover');
// }
// gameResetBtn.remove('hidden');

function checkWinner() {
  empties--;
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
    draw();
    winnerState = true;
  }
}

// Math.floor(Math.random() * max);`
function togglePlayers() {
  numPlayers = numPlayersToggle.checked ? 2 : 1;
  numPlayersTextP.textContent = `${numPlayers} players`;
}
numPlayersToggle.addEventListener('change', togglePlayers);

gameStartBtn.addEventListener(touchEvent, function () {
  headerInfoEl.classList.add('opacity-transition');
  setTimeout(function () {
    addHiddenEl(headerInfoEl);
  }, 500);
  buildSquares();
  playGame();
});

function buildSquares() {
  for (let i = 0; i < gameSquares.length; i++) {
    gameSquares[i].addEventListener(touchEvent, function () {
      if (!gameSquares[i].textContent) {
        gameSquares[i].textContent = playerSymb;
        gameSquares[i].classList.add('no-hover');
      }
    });
  }
}

function onePlayerGame() {
  for (let i = 0; i < gameSquares.length; i++) {
    gameSquares[i].addEventListener(touchEvent, function () {
      checkWinner();
      // empties--;
      squaresPause();
      gameSquares[i].classList.add('no-hover');
      if (!winnerState) {
        compMove();
      }
    });
  }
}

function twoPlayerGame() {
  for (let i = 0; i < gameSquares.length; i++) {
    gameSquares[i].addEventListener(touchEvent, function () {
      checkWinner();
      // empties--;
      playerSymb = playerSymb === 'X' ? 'O' : 'X';
    });
  }
}

function squaresState(state) {
  for (let v = 0; v < gameSquares.length; v++) {
    gameSquares[v].style.pointerEvents = `${state}`;
  }
}

function compMove() {
  setTimeout(function () {
    intelligence();
    squaresStart();
    checkWinner();
  }, Math.floor(Math.random() * 1000));
}

function playGame() {
  if (numPlayers === 1) {
    onePlayerGame();
  } else if (numPlayers === 2) {
    twoPlayerGame();
  }
}

//Resets the Game
const resetGame = function () {
  playerTurn.textContent = `${winnerSymb} makes the first move!`;
  gameResetBtn.classList.add('hidden');

  setTimeout(function () {
    for (i = 0; i < gameSquares.length; i++) {
      gameSquares[i].textContent = '';
      playerSymb = winnerSymb;
      gameSquares[i].classList.remove('no-hover');
      empties = 9;
    }
  }, 40);

  setTimeout(function () {
    winner.classList.add('opacity-transition');
  }, 1000);

  setTimeout(function () {
    winner.classList.add('hidden');
    if (numPlayers === 1 && winnerSymb === 'O') {
      squaresPause();
      compMove();
      playerSymb = 'X';
    }
  }, 1500);
  // winnerState = false;

  squaresStart();
  winnerState = false;
};

gameResetBtn.addEventListener(touchEvent, resetGame);
// gameResetBtn.addEventListener(touchEvent, playGame);

// // GAME LOGIC
