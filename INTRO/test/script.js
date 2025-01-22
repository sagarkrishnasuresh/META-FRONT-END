const board = document.getElementById('board');
const player = document.getElementById('player');
const diceValue = document.getElementById('diceValue');
const playerPositionDisplay = document.getElementById('playerPosition');
const rollDiceButton = document.getElementById('rollDice');

// Create the board
const cells = [];
for (let i = 100; i > 0; i--) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.textContent = i;
  board.appendChild(cell);
  cells.push(cell);
}

// Snakes and Ladders mapping
const snakes = {
  14: 4,
  31: 9,
  38: 20,
  84: 28,
  96: 78,
};

const ladders = {
  3: 22,
  8: 26,
  28: 84,
  58: 77,
  75: 97,
};

// Player state
let currentPosition = 1;

// Roll dice and update player position
rollDiceButton.addEventListener('click', () => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  diceValue.textContent = diceRoll;

  let newPosition = currentPosition + diceRoll;

  // Check bounds
  if (newPosition > 100) {
    newPosition = currentPosition; // Stay in place
  }

  // Check for snakes or ladders
  if (snakes[newPosition]) {
    newPosition = snakes[newPosition];
  } else if (ladders[newPosition]) {
    newPosition = ladders[newPosition];
  }

  // Update position
  currentPosition = newPosition;
  playerPositionDisplay.textContent = currentPosition;

  // Move player
  movePlayer(currentPosition);
});

// Move player to the correct cell
function movePlayer(position) {
  const index = 100 - position;
  const cell = cells[index];
  const rect = cell.getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();

  player.style.left = `${rect.left - boardRect.left + 5}px`;
  player.style.top = `${rect.top - boardRect.top + 5}px`;
}
