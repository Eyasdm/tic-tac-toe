'use strict';

// ==============================
// Select DOM Elements
// ==============================
const playerX = document.querySelector('.player-x');
const playerO = document.querySelector('.player-o');
const resetBtn = document.querySelector('.reset');
const newGameBtn = document.querySelector('.new-game-btn');
const continueBtn = document.querySelector('.continue-btn');

let currentPlayer = 'X';
let score1 = Number(document.querySelector('.score-1').textContent);
let score2 = Number(document.querySelector('.score-2').textContent);

// ==============================
// Function to Update Hover Effect Based on Current Player
// ==============================
function updateCurrentPlayerHover() {
  const player1 = document.querySelector('.player-1');
  const player2 = document.querySelector('.player-2');

  player1.classList.remove('choice-cell-hover');
  player2.classList.remove('choice-cell-hover');

  if (currentPlayer === 'X') {
    player1.classList.add('choice-cell-hover');
  } else {
    player2.classList.add('choice-cell-hover');
  }
}

// ==============================
// Function to Check Winner
// ==============================
function checkWinner() {
  const cells = [];
  for (let i = 0; i < 9; i++) {
    cells.push(document.querySelector(`.cell-${i}`).textContent);
  }

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombos) {
    if (cells[a] === cells[b] && cells[b] === cells[c] && cells[a] !== '') {
      return cells[a];
    }
  }

  // If no winner and no empty cells, it's a draw
  if (cells.every(cell => cell !== '')) {
    return 'Draw';
  }

  return null;
}

// ==============================
// Reset Board Function (Without Resetting Scores)
// ==============================
function clearBoard() {
  for (let i = 0; i < 9; i++) {
    document.querySelector(`.cell-${i}`).textContent = '';
  }
}

// ==============================
// Game Cell Click Handling
// ==============================
for (let i = 0; i < 9; i++) {
  document.querySelector(`.cell-${i}`).addEventListener('click', function () {
    const cell = document.querySelector(`.cell-${i}`);

    // Do nothing if the cell is already filled
    if (cell.textContent !== '') return;

    // Set current player's symbol in cell
    cell.textContent = currentPlayer;

    // Check for winner after move
    const winner = checkWinner();

    // Handle win or draw
    if (winner === 'X' || winner === 'O') {
      document.querySelector('.modal').classList.remove('hidden');
      document.querySelector('.overlay').classList.remove('hidden');

      const player1Symbol =
        document.querySelector('.player1-symbol').textContent;
      const player2Symbol =
        document.querySelector('.player2-symbol').textContent;

      if (winner === player1Symbol) {
        score1++;
        document.querySelector('.score-1').textContent = score1;
        document.querySelector('.winner').textContent =
          'Player 1 wins this round!';
        currentPlayer = 'X';
        document.querySelector('.who-will-play').textContent =
          'Next game: Player 1 will start and play with “X”';
      } else {
        score2++;
        document.querySelector('.score-2').textContent = score2;
        document.querySelector('.winner').textContent =
          'Player 2 wins this round!';
        currentPlayer = 'O';
        document.querySelector('.who-will-play').textContent =
          'Next game: Player 2 will start and play with “O”';
      }
    } else if (winner === 'Draw') {
      // Handle draw case
      document.querySelector('.modal').classList.remove('hidden');
      document.querySelector('.overlay').classList.remove('hidden');
      document.querySelector('.winner').textContent = "It's a draw!";
      document.querySelector('.who-will-play').textContent = `Next game: ${
        currentPlayer === 'X' ? 'Player 1' : 'Player 2'
      } will start`;
    } else {
      // Switch turn if no winner or draw
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    updateCurrentPlayerHover();
  });
}

// ==============================
// Reset Button Event
// Clears the board only
// ==============================
resetBtn.addEventListener('click', clearBoard);

// ==============================
// New Game Button Event
// Resets everything including scores
// ==============================
newGameBtn.addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  score1 = 0;
  score2 = 0;
  document.querySelector('.score-1').textContent = '0';
  document.querySelector('.score-2').textContent = '0';
  clearBoard();
});

// ==============================
// Continue Button Event
// Closes the modal and resets board for next round
// ==============================
continueBtn.addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  clearBoard();
});

// FIXME: THE DRAW CASE YOU SHOULD ADD A MODEL FOR DRAW.
// FIXME: WHEN USER CLICK ON A FILLED CELL IT SHOULD NOT BE TREATED AS CLICKED SO IT SHOULD NOT CHANGE THE TURN.
// FIXME: WHEN USER CLICK RESET IT DOES NOT RESET THE ROUND WITH FIRST PLAYER INSTEAD IT JUST SWITCH TURN.
