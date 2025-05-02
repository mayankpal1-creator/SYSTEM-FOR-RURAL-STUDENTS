const flashcards = [
    { 
        question: "ARDUINO UNO", 
        answer: "Arduino Uno is an open-source microcontroller board based on the ATmega328P, used for building electronics projects. It features digital and analog I/O pins, a USB interface, and supports easy programming via the Arduino IDE.", 
        image: "images/arduino.png"
    },
    { 
        question: "ULTRASONIC SENSOR", 
        answer: "An ultrasonic sensor measures distance by emitting ultrasonic waves and detecting their reflection from an object. It is commonly used in robotics for obstacle detection, distance measurement, and automation projects.", 
        image: "images/ultrasonic.png"
    },
    { 
        question: "BREADBOARD", 
        answer: "A breadboard is a reusable platform for prototyping electronic circuits without soldering. It allows easy connection of components using pre-drilled holes and internal conductive strips for quick experimentation and testing.", 
        image: "images/breadboard.png"
    },
    { 
        question: "IR SENSOR", 
        answer: "An IR (Infrared) sensor detects objects and measures distance using infrared radiation. It is commonly used in proximity detection, obstacle avoidance, and line-following robots.", 
        image: "images/irsensor.png"
    }
];

let currentIndex = 0;
let showAnswer = false;
const flashcardText = document.getElementById("flashcardText");
const flashcardImage = document.getElementById("flashcardImage");

function flipCard() {
    showAnswer = !showAnswer;
    flashcardText.textContent = showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question;
}

function nextCard() {
    showAnswer = false;
    currentIndex = (currentIndex + 1) % flashcards.length;
    flashcardText.textContent = flashcards[currentIndex].question;
    flashcardImage.src = flashcards[currentIndex].image;
}

// Load the first question
nextCard();