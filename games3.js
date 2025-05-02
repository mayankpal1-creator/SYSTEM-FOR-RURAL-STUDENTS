const elements = [
    { symbol: 'H', name: 'Hydrogen' },
    { symbol: 'He', name: 'Helium' },
    { symbol: 'Li', name: 'Lithium' },
    { symbol: 'Be', name: 'Beryllium' },
    { symbol: 'B', name: 'Boron' },
    { symbol: 'C', name: 'Carbon' },
    { symbol: 'N', name: 'Nitrogen' },
    { symbol: 'O', name: 'Oxygen' },
    { symbol: 'F', name: 'Fluorine' },
    { symbol: 'Ne', name: 'Neon' },
  ];
  
  let currentElement;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function loadGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
  
    shuffle(elements);
    elements.forEach(element => {
      const elementDiv = document.createElement('div');
      elementDiv.classList.add('element');
      elementDiv.textContent = element.symbol;
      elementDiv.dataset.name = element.name;
      elementDiv.addEventListener('click', checkAnswer);
      gameBoard.appendChild(elementDiv);
    });
  }
  
  function setNewQuestion() {
    currentElement = elements[Math.floor(Math.random() * elements.length)];
    document.getElementById('current-element').textContent = currentElement.name;
  }
  
  function checkAnswer() {
    if (this.dataset.name === currentElement.name) {
      this.classList.add('correct');
      alert('Correct! Great job!');
      setNewQuestion();
      loadGameBoard();
    } else {
      alert('Wrong! Try again.');
    }
  }
  
  // Initialize the game
  setNewQuestion();
  loadGameBoard();
  