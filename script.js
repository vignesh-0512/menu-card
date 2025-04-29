const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let xTurn = true;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  xTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.classList.add('hidden');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = xTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  if (checkWin(currentClass)) {
    winningMessage.textContent = `${xTurn ? 'X' : 'O'} wins!`;
    winningMessage.classList.remove('hidden');
    endGame();
  } else if (isDraw()) {
    winningMessage.textContent = `It's a Draw!`;
    winningMessage.classList.remove('hidden');
  } else {
    xTurn = !xTurn;
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}
