let num1, num2, correctAnswer;

function generateQuestion() {
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;
  correctAnswer = num1 + num2;
  document.getElementById('question').textContent = `What is ${num1} + ${num2}?`;
  document.getElementById('answer').value = '';
  document.getElementById('result').textContent = '';
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  const result = document.getElementById('result');

  if (isNaN(userAnswer)) {
    result.textContent = 'Please enter a valid number.';
    result.style.color = 'orange';
    return;
  }

  if (userAnswer === correctAnswer) {
    result.textContent = 'Correct! Great job!';
    result.style.color = 'green';
  } else {
    result.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
    result.style.color = 'red';
  }

  setTimeout(generateQuestion, 2000); // New question after 2 seconds
}

// Start the first question
generateQuestion();
