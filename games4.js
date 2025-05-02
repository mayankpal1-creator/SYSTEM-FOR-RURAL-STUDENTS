const words = ["education", "science", "computer", "knowledge", "challenge", "engineer"];
let currentIndex = 0;
let score = 0;

function speakWord() {
  const speech = new SpeechSynthesisUtterance(words[currentIndex]);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

function checkSpelling() {
  const userAnswer = document.getElementById("userInput").value.toLowerCase();
  const correctAnswer = words[currentIndex];

  if (userAnswer === correctAnswer) {
    document.getElementById("result").textContent = "✅ Correct!";
    score++;
    document.getElementById("score").textContent = score;
  } else {
    document.getElementById("result").textContent = `❌ Wrong! Correct spelling: ${correctAnswer}`;
  }
}

function nextWord() {
  document.getElementById("userInput").value = "";
  document.getElementById("result").textContent = "";
  currentIndex = (currentIndex + 1) % words.length;
}
