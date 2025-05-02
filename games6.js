const quizData = [
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "NaCl"],
        answer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Jupiter", "Mars", "Venus"],
        answer: 2
    },
    {
        question: "What is the main gas found in the Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 2
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "3,000 km/s"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    const questionData = quizData[currentQuestionIndex];
    questionEl.textContent = questionData.question;
    optionsEl.forEach((btn, index) => {
        btn.textContent = questionData.options[index];
    });
    resultEl.textContent = "";
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === quizData[currentQuestionIndex].answer) {
        resultEl.textContent = "✅ Correct!";
        score++;
        scoreEl.textContent = score;
    } else {
        resultEl.textContent = "❌ Wrong! Try again.";
    }
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
    loadQuestion();
}

loadQuestion();
