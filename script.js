let selectedCourse = [];
let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 600;
let timer;

function startQuiz() {
  const name =
    document.getElementById("studentName").value;

  const course =
    document.getElementById("course").value;

  if (name === "" || course === "") {
    alert(
      "Please enter your name and select a course."
    );
    return;
  }

  document.getElementById("displayName")
    .textContent = name;

  document.getElementById("displayCourse")
    .textContent = course;

  selectedCourse = eval(course);

  currentQuestion = 0;
  timeLeft = 600;

  userAnswers =
    new Array(selectedCourse.length).fill(null);

  document.getElementById("start-screen")
    .classList.add("hidden");

  document.getElementById("quiz-screen")
    .classList.remove("hidden");

  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    let minutes =
      Math.floor(timeLeft / 60);

    let seconds =
      timeLeft % 60;

    document.getElementById("timer")
      .textContent =
      `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft === 120) {
      alert(
        "⚠️ Hurry! Only 2 minutes remaining."
      );
    }

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const q =
    selectedCourse[currentQuestion];

  document.getElementById(
    "question-number"
  ).textContent =
    `Question ${currentQuestion + 1} of ${selectedCourse.length}`;

  document.getElementById(
    "question"
  ).textContent =
    q.question;

  let progress =
    ((currentQuestion + 1) /
      selectedCourse.length) * 100;

  document.getElementById(
    "progress-bar"
  ).style.width =
    progress + "%";

  const options =
    document.getElementById("options");

  options.innerHTML = "";

  q.options.forEach((option, index) => {
    const div =
      document.createElement("div");

    div.classList.add("option");

    if (
      userAnswers[currentQuestion] === index
    ) {
      div.classList.add("selected");
    }

    div.innerHTML =
      String.fromCharCode(65 + index) +
      ". " +
      option;

    div.onclick = () => {
      userAnswers[currentQuestion] =
        index;

      showQuestion();
    };

    options.appendChild(div);
  });
}

function nextQuestion() {
  if (
    currentQuestion <
    selectedCourse.length - 1
  ) {
    currentQuestion++;
    showQuestion();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function submitQuiz() {
  clearInterval(timer);

  let score = 0;

  selectedCourse.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  let percentage =
    Math.round(
      (score /
        selectedCourse.length) *
        100
    );

  let message = "";

  if (percentage >= 90) {
    message = "🎉 Excellent!";
  } else if (percentage >= 70) {
    message = "👍 Very Good!";
  } else if (percentage >= 50) {
    message =
      "📚 Good, Keep Practicing!";
  } else {
    message =
      "💪 More Practice Needed!";
  }

  localStorage.setItem(
    "lastResult",
    JSON.stringify({
      name:
        document.getElementById(
          "studentName"
        ).value,
      course:
        document.getElementById(
          "course"
        ).value,
      score,
      percentage
    })
  );

  document.getElementById(
    "quiz-screen"
  ).classList.add("hidden");

  document.getElementById(
    "result-screen"
  ).classList.remove("hidden");

  document.getElementById(
    "resultName"
  ).textContent =
    "Candidate: " +
    document.getElementById(
      "studentName"
    ).value;

  document.getElementById(
    "resultCourse"
  ).textContent =
    "Course: " +
    document.getElementById(
      "course"
    ).value;

  document.getElementById(
    "score"
  ).innerHTML =
    `Score: ${score}/${selectedCourse.length}
     <br>
     Percentage: ${percentage}%
     <br><br>
     ${message}`;
}

function reviewAnswers() {
  const review =
    document.getElementById(
      "reviewBox"
    );

  review.innerHTML = "";

  selectedCourse.forEach((q, i) => {
    const div =
      document.createElement("div");

    div.classList.add(
      "review-item"
    );

    const user =
      userAnswers[i] !== null
        ? q.options[userAnswers[i]]
        : "No Answer";

    const correct =
      q.options[q.answer];

    div.innerHTML =
      `
      <h4>Question ${i + 1}</h4>

      <p>${q.question}</p>

      <p>
      Your Answer:
      ${user}
      </p>

      <p class="correct">
      Correct Answer:
      ${correct}
      </p>
      `;

    review.appendChild(div);
  });
}

window.onload = function () {
  let result =
    JSON.parse(
      localStorage.getItem(
        "lastResult"
      )
    );

  if (result) {
    document.getElementById(
      "previousResult"
    ).innerHTML =
      `
      <h3>
      Previous Result
      </h3>

      <p>
      Name:
      ${result.name}
      </p>

      <p>
      Course:
      ${result.course}
      </p>

      <p>
      Score:
      ${result.score}/20
      </p>

      <p>
      Percentage:
      ${result.percentage}%
      </p>
      `;
  }
};
const GST112 = [
  {
    question:
      "Nigeria is located on the ______ coast of West Africa.",
    options: [
      "Eastern",
      "Southern",
      "Western",
      "Northern"
    ],
    answer: 2
  },

  {
    question:
      "The three major ethnic groups in Nigeria are:",
    options: [
      "Tiv, Nupe and Kanuri",
      "Hausa-Fulani, Yoruba and Igbo",
      "Igala, Edo and Ibibio",
      "Fulani, Tiv and Efik"
    ],
    answer: 1
  }

  // Continue until Question 20
];

const MTH132 = [
  // Add all 20 MTH questions
];

const PHY102 = [
  // Add all 20 PHY questions
];

const CSC104 = [
  // Add all 20 CSC104 questions
];

const CSC122 = [
  // Add all 20 CSC122 questions
];

const COS102 = [
  // Add all 20 COS102 questions
];