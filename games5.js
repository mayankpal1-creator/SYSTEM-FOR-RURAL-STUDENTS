const countries = ["USA", "India", "Brazil", "France"];
let currentCountry = "";
let score = 0;

function nextQuestion() {
    currentCountry = countries[Math.floor(Math.random() * countries.length)];
    document.getElementById("targetCountry").textContent = currentCountry;
    document.getElementById("result").textContent = "";
}

function checkAnswer(selected) {
    if (selected === currentCountry) {
        document.getElementById("result").textContent = "✅ Correct!";
        score++;
        document.getElementById("score").textContent = score;
    } else {
        document.getElementById("result").textContent = "❌ Wrong! Try again.";
    }
}

nextQuestion();
