const draggables = document.querySelectorAll('.draggable');
const targetBox = document.getElementById('target-box');
const checkButton = document.getElementById('checkOrder');
const resultMessage = document.getElementById('resultMessage');

// Correct order for photosynthesis steps
const correctOrder = [
  "Takes in water from roots",
  "Absorbs sunlight",
  "Takes in CO₂",
  "Releases oxygen"
];

draggables.forEach(drag => {
  drag.addEventListener('dragstart', () => {
    drag.classList.add('dragging');
  });
  drag.addEventListener('dragend', () => {
    drag.classList.remove('dragging');
  });
});

targetBox.addEventListener('dragover', (e) => {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  if (dragging && !targetBox.contains(dragging)) {
    targetBox.appendChild(dragging);
  }
});

checkButton.addEventListener('click', () => {
  const droppedItems = Array.from(targetBox.querySelectorAll('.draggable'));
  const userOrder = droppedItems.map(item => item.textContent.trim());

  const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);

  if (isCorrect) {
    resultMessage.textContent = "✅ Correct Order! Great job!";
    resultMessage.style.color = "green";
  } else {
    resultMessage.textContent = "❌ Incorrect Order! Try again.";
    resultMessage.style.color = "red";
  }
});
