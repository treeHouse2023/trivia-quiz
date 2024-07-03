// Quiz Data
const quizQuestions = [
  {
    question: "What is the top speed of the Bugatti Veyron?",
    answers: ["250 mph", "267 mph", "280 mph", "300 mph"],
    correctAnswer: "267 mph",
  },
  {
    question: "Which car is known as the first mass-produced car?",
    answers: [
      "Ford Model T",
      "Volkswagen Beetle",
      "Chevrolet Bel Air",
      "Mercedes-Benz 300 SL",
    ],
    correctAnswer: "Ford Model T",
  },
  {
    question: "Which company manufactures the 911 series?",
    answers: ["Ferrari", "Porsche", "Lamborghini", "Maserati"],
    correctAnswer: "Porsche",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion(index) {
  if (index >= quizQuestions.length) {
    showResults();
    return;
  }

  const question = quizQuestions[index];
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${question.question}</h5>
          ${question.answers
            .map(
              (answer, i) => `
            <div class="form-check">
              <input class="form-check-input" type="radio" name="question${index}" id="answer${i}" value="${answer}">
              <label class="form-check-label" for="answer${i}">${answer}</label>
            </div>
          `
            )
            .join("")}
          <button class="btn btn-primary mt-3" onclick="nextQuestion()">Next</button>
        </div>
      </div>
    `;

  if (index === quizQuestions.length - 1) {
    document.querySelector(".btn").textContent = "Submit";
  }
}

function nextQuestion() {
  const selectedAnswer = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (!selectedAnswer) {
    alert("Please select an answer!");
    return;
  }

  if (
    selectedAnswer.value === quizQuestions[currentQuestionIndex].correctAnswer
  ) {
    score++;
  }

  currentQuestionIndex++;
  loadQuestion(currentQuestionIndex);
}

function showResults() {
  const resultText = `You scored ${score} out of ${quizQuestions.length}`;
  document.getElementById("resultText").innerText = resultText;
  const resultModal = new bootstrap.Modal(
    document.getElementById("resultModal")
  );
  resultModal.show();
  resetQuiz();
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion(currentQuestionIndex);
}

window.onload = function () {
  loadQuestion(currentQuestionIndex);
};

// Feedback Form Validation
document
  .getElementById("feedback-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const feedback = document.getElementById("feedback").value.trim();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (name && email && feedback) {
      alert("Thank you for your feedback!");
      document.getElementById("feedback-form").reset();
    } else {
      alert("Please fill out all fields.");
    }
  });

function validateEmail(email) {
  // Simple email validation
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}
