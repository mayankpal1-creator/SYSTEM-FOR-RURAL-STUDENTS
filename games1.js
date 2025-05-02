const icons = ['✨', '❤', '☀', '☕', '⛄', '⭐', '✈', '♥'];
const cards = [...icons, ...icons]; // Duplicate icons for matching pairs

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(cards);

const gameBoard = document.getElementById('gameBoard');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Create cards
cards.forEach((icon) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.icon = icon;
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flipped');
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
