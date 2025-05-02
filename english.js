const correctAnswers = {
  run: "verb",
  eat: "verb",
  dog: "noun",
  car: "noun",
  happy: "adjective",
  blue: "adjective"
};

document.querySelectorAll('.word').forEach(word => {
  word.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.innerText);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const draggedWord = [...document.querySelectorAll('.word')].find(w => w.innerText === data);
  if (draggedWord && !e.currentTarget.contains(draggedWord)) {
    e.currentTarget.appendChild(draggedWord);
  }
}

function checkAnswers() {
  let correct = 0;
  let total = Object.keys(correctAnswers).length;

  document.querySelectorAll('.category').forEach(category => {
    const type = category.dataset.type;
    const words = category.querySelectorAll('.word');
    words.forEach(word => {
      if (correctAnswers[word.innerText] === type) {
        word.style.backgroundColor = "#a8e6cf"; // light green
        correct++;
      } else {
        word.style.backgroundColor = "#ff8b94"; // light red
      }
    });
  });

  document.getElementById("result").innerText = `✅ You got ${correct} out of ${total} correct.`;
}
