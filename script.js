// ===== VARIABLES =====
let selectedCourse = [];
let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 600;
let timer;

// ===== START QUIZ =====
function startQuiz() {
  const name = document.getElementById("studentName").value.trim();
  const course = document.getElementById("course").value;

  if (name === "" || course === "") {
    alert("Please enter your name and select a course.");
    return;
  }

  document.getElementById("displayName").textContent = name;
  document.getElementById("displayCourse").textContent = course;

  selectedCourse = getCourse(course);

  if (!selectedCourse || selectedCourse.length === 0) {
    alert("No questions available for this course.");
    return;
  }

  currentQuestion = 0;
  userAnswers = new Array(selectedCourse.length).fill(null);
  timeLeft = 600;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  startTimer();
  showQuestion();
}

// ===== TIMER =====
function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
      `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft === 120) {
      alert("⚠️ Hurry! Only 2 minutes remaining.");
    }

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

// ===== SHOW QUESTION =====
function showQuestion() {
  const q = selectedCourse[currentQuestion];

  document.getElementById("question-number").textContent =
    `Question ${currentQuestion + 1} of ${selectedCourse.length}`;

  document.getElementById("question").textContent = q.question;

  let progress =
    ((currentQuestion + 1) / selectedCourse.length) * 100;

  document.getElementById("progress-bar").style.width =
    progress + "%";

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.classList.add("option");

    if (userAnswers[currentQuestion] === index) {
      div.classList.add("selected");
    }

    div.textContent =
      String.fromCharCode(65 + index) + ". " + option;

    div.onclick = function () {
      userAnswers[currentQuestion] = index;
      showQuestion();
    };

    optionsDiv.appendChild(div);
  });
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  if (currentQuestion < selectedCourse.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

// ===== PREVIOUS QUESTION =====
function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// ===== SUBMIT QUIZ =====
function submitQuiz() {
  clearInterval(timer);

  let score = 0;

  selectedCourse.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  let percentage =
    Math.round((score / selectedCourse.length) * 100);

  let message = "";

  if (percentage >= 90) {
    message = "🎉 Excellent!";
  } else if (percentage >= 70) {
    message = "👍 Very Good!";
  } else if (percentage >= 50) {
    message = "📚 Good, Keep Practicing!";
  } else {
    message = "💪 More Practice Needed!";
  }

  localStorage.setItem(
    "lastResult",
    JSON.stringify({
      name: document.getElementById("studentName").value,
      course: document.getElementById("course").value,
      score,
      percentage
    })
  );

  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("resultName").textContent =
    "Candidate: " +
    document.getElementById("studentName").value;

  document.getElementById("resultCourse").textContent =
    "Course: " +
    document.getElementById("course").value;

  document.getElementById("score").innerHTML =
    `Score: ${score}/${selectedCourse.length}
     <br>
     Percentage: ${percentage}%
     <br><br>
     ${message}`;
}

// ===== REVIEW ANSWERS =====
function reviewAnswers() {
  const review = document.getElementById("reviewBox");
  review.innerHTML = "";

  selectedCourse.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("review-item");

    const user =
      userAnswers[i] !== null
        ? q.options[userAnswers[i]]
        : "No Answer";

    const correct = q.options[q.answer];

    div.innerHTML = `
      <h4>Question ${i + 1}</h4>
      <p>${q.question}</p>
      <p>Your Answer: ${user}</p>
      <p class="correct">
        Correct Answer: ${correct}
      </p>
    `;

    review.appendChild(div);
  });
}

// ===== GET COURSE =====
function getCourse(course) {
  return {
    GST112,
    MTH132,
    PHY102,
    CSC104,
    CSC122,
    COS102
  }[course];
}

// ===== SHOW PREVIOUS RESULT =====
window.onload = function () {
  let result = JSON.parse(
    localStorage.getItem("lastResult")
  );

  if (result) {
    document.getElementById("previousResult").innerHTML = `
      <h3>Previous Result</h3>
      <p>Name: ${result.name}</p>
      <p>Course: ${result.course}</p>
      <p>Score: ${result.score}/20</p>
      <p>Percentage: ${result.percentage}%</p>
    `;
  }
};
const GST112 = [
  {
    question: "Nigeria is located on the ______ coast of West Africa.",
    options: ["Eastern", "Southern", "Western", "Northern"],
    answer: 2
  },
  {
    question: "The three major ethnic groups in Nigeria are:",
    options: [
      "Tiv, Nupe and Kanuri",
      "Hausa-Fulani, Yoruba and Igbo",
      "Igala, Edo and Ibibio",
      "Fulani, Tiv and Efik"
    ],
    answer: 1
  },
  {
    question: "Culture can best be defined as:",
    options: [
      "A country's economy",
      "People's inherited wealth",
      "The total way of life of a people",
      "Political activities of a nation"
    ],
    answer: 2
  },
  {
    question: "The official language of Nigeria is:",
    options: ["Hausa", "Yoruba", "Igbo", "English"],
    answer: 3
  },
  {
    question: "The process of teaching and learning is known as:",
    options: [
      "Communication",
      "Education",
      "Socialization",
      "Civilization"
    ],
    answer: 1
  },
{
    question: "The Hausa-Fulani people predominantly occupied the ______ region of Nigeria during the pre-colonial era.",
    options: ["Southern", "Eastern", "Northern", "Western"],
    answer: 2
  },
  {
    question: "The Yoruba traditional political system was mainly headed by:",
    options: ["Emir", "Oba", "Obi", "Attah"],
    answer: 1
  },
  {
    question: "One major importance of studying Nigerian cultures is to:",
    options: [
      "Promote tribalism",
      "Encourage religious conflict",
      "Foster national unity",
      "Encourage colonialism"
    ],
    answer: 2
  },
  {
    question: "The culture area that consists mainly of Igbo-speaking communities is the:",
    options: [
      "Northern Culture Area",
      "Western Culture Area",
      "Middle Belt Culture Area",
      "South-Eastern Culture Area"
    ],
    answer: 3
  },
  {
    question: "Which of the following religions existed in Nigeria before colonial rule?",
    options: [
      "Christianity only",
      "Islam only",
      "African Traditional Religion only",
      "African Traditional Religion and Islam"
    ],
    answer: 3
  },
  {
    question: "One major contribution of education to national development is:",
    options: [
      "Increased illiteracy",
      "Human capital development",
      "Ethnic conflicts",
      "Cultural backwardness"
    ],
    answer: 1
  },
  {
    question: "Social justice refers to:",
    options: [
      "Unequal treatment of citizens",
      "Political dominance by one ethnic group",
      "Fairness and equal opportunities for all citizens",
      "Religious superiority"
    ],
    answer: 2
  },
{
    question: "Which of the following best describes pre-colonial Nigerian societies?",
    options: [
      "They had no systems of government",
      "They lacked economic activities",
      "They possessed organized political and socio-economic institutions",
      "They were entirely dependent on Europe"
    ],
    answer: 2
  },
  {
    question: "The concept of culture areas in Nigeria is mainly based on:",
    options: [
      "Geological formations",
      "Similar cultural traits and patterns",
      "Political parties",
      "Climatic conditions alone"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a major obstacle to national development in Nigeria?",
    options: [
      "Patriotism",
      "Quality education",
      "Ethnic and religious intolerance",
      "Technological advancement"
    ],
    answer: 2
  },
  {
    question: "The moral rights of Nigerian citizens include the right to:",
    options: [
      "Oppress others",
      "Participate responsibly in society",
      "Deny others their rights",
      "Encourage corruption"
    ],
    answer: 1
  },
  {
    question: "Which of the following constitutional rights is classified as a socio-political right?",
    options: [
      "Right to private revenge",
      "Right to participate in governance",
      "Right to discriminate",
      "Right to ethnic supremacy"
    ],
    answer: 1
  },
  {
    question: "Religion contributes to national development primarily through:",
    options: [
      "Promoting moral values and social cohesion",
      "Encouraging political instability",
      "Supporting corruption",
      "Discouraging education"
    ],
    answer: 0
  },
  {
    question: "The Nigerian economy in pre-colonial times was largely characterized by:",
    options: [
      "Oil exploration only",
      "Manufacturing industries only",
      "Agriculture, trade and crafts",
      "Banking activities only"
    ],
    answer: 2
  },
  {
    question: "Historical analysis of social justice in Nigeria reveals that national development is best achieved when:",
    options: [
      "Resources are controlled by one group",
      "Citizens are denied opportunities",
      "Justice, equity and inclusiveness are promoted",
      "Political rights are restricted"
    ],
    answer: 2
  }
];
const MTH132 = [
  {
    question: "A function from set A to set B assigns:",
    options: [
      "More than one element of B to each element of A",
      "Exactly one element of B to each element of A",
      "No element of B to some elements of A",
      "All elements of B to one element of A"
    ],
    answer: 1
  },
  {
    question: "The domain of the function f(x) = 1/(x - 2) is:",
    options: [
      "All real numbers",
      "x ≠ 0",
      "x ≠ 2",
      "x = 2"
    ],
    answer: 2
  },
  {
    question: "Evaluate lim(x→2)(x + 3).",
    options: ["2", "3", "5", "6"],
    answer: 2
  },
  {
    question: "Find the derivative of y = x³.",
    options: ["x²", "2x", "3x²", "3x"],
    answer: 2
  },
  {
    question: "Evaluate ∫4x dx.",
    options: [
      "2x² + C",
      "4x + C",
      "x² + C",
      "8x + C"
    ],
    answer: 0
  },
  {
    question: "The function f(x) = 2x + 1 is:",
    options: [
      "Constant",
      "Quadratic",
      "Linear",
      "Exponential"
    ],
    answer: 2
  },
  {
    question: "Evaluate lim(x→3)(x² + 1).",
    options: ["8", "9", "10", "12"],
    answer: 2
  },
  {
    question: "A function is continuous at x = a if:",
    options: [
      "f(a) does not exist",
      "The limit does not exist",
      "lim(x→a)f(x) = f(a)",
      "f(a) = 0"
    ],
    answer: 2
  },
  {
    question: "Find the derivative of f(x) = 5x⁴.",
    options: [
      "20x³",
      "5x³",
      "4x⁵",
      "20x⁴"
    ],
    answer: 0
  },
  {
    question: "The slope of a curve at a point is obtained by:",
    options: [
      "Integration",
      "Differentiation",
      "Factorization",
      "Approximation"
    ],
    answer: 1
  },
  {
    question: "Evaluate ∫(3x² + 2) dx.",
    options: [
      "x³ + 2x + C",
      "3x³ + 2x + C",
      "x³ + x + C",
      "6x + 2 + C"
    ],
    answer: 0
  },
  {
    question: "Evaluate ∫₀² x dx.",
    options: ["1", "2", "3", "4"],
    answer: 1
  },
  {
    question: "Find the derivative of y = (2x + 1)⁵.",
    options: [
      "10(2x + 1)⁴",
      "5(2x + 1)⁴",
      "2(2x + 1)⁵",
      "20(2x + 1)⁵"
    ],
    answer: 0
  },
  {
    question: "Evaluate lim(x→1)[(x² − 1)/(x − 1)].",
    options: ["0", "1", "2", "3"],
    answer: 2
  },
  {
    question: "If y = 3x² − 4x + 7, find dy/dx.",
    options: [
      "6x − 4",
      "6x + 4",
      "3x − 4",
      "6x² − 4"
    ],
    answer: 0
  },
  {
    question: "The stationary points of a curve occur where:",
    options: [
      "dy/dx = 1",
      "dy/dx = 0",
      "y = 0",
      "x = 0"
    ],
    answer: 1
  },
  {
    question: "Evaluate ∫(2x + 5)² dx.",
    options: [
      "((2x + 5)³)/6 + C",
      "(2x + 5)³ + C",
      "((2x + 5)²)/2 + C",
      "2(2x + 5)³ + C"
    ],
    answer: 0
  },
  {
    question: "Find the distance between the points (1,2) and (4,6).",
    options: ["3", "4", "5", "6"],
    answer: 2
  },
  {
    question: "The equation of a circle with centre at the origin and radius 3 is:",
    options: [
      "x² + y² = 3",
      "x² + y² = 6",
      "x² + y² = 9",
      "x + y = 3"
    ],
    answer: 2
  },
  {
    question: "Find the area under y = x² from x = 0 to x = 2.",
    options: [
      "4/3",
      "8/3",
      "4",
      "8"
    ],
    answer: 1
  }
];
const PHY102 = [
  {
    question: "Electrostatics is the study of:",
    options: [
      "Moving charges",
      "Stationary electric charges",
      "Magnetic fields only",
      "Electric circuits only"
    ],
    answer: 1
  },
  {
    question: "The SI unit of electric charge is:",
    options: [
      "Volt (V)",
      "Ampere (A)",
      "Coulomb (C)",
      "Ohm (Ω)"
    ],
    answer: 2
  },
  {
    question: "According to Coulomb's law, like charges:",
    options: [
      "Attract each other",
      "Repel each other",
      "Neutralize each other",
      "Produce current"
    ],
    answer: 1
  },
  {
    question: "The SI unit of potential difference is:",
    options: [
      "Joule",
      "Coulomb",
      "Watt",
      "Volt"
    ],
    answer: 3
  },
  {
    question: "The direction of conventional electric current is:",
    options: [
      "From negative to positive terminal",
      "From positive to negative terminal",
      "Random",
      "Circular only"
    ],
    answer: 1
  },
  {
    question: "The electric force between two charges is directly proportional to:",
    options: [
      "The square of the distance between them",
      "The product of the charges",
      "The sum of the charges",
      "Their masses"
    ],
    answer: 1
  },
  {
    question: "Electric potential at a point is defined as:",
    options: [
      "Force per unit charge",
      "Energy per unit charge",
      "Charge per unit force",
      "Current per unit charge"
    ],
    answer: 1
  },
  {
    question: "Gauss's law relates electric flux through a closed surface to:",
    options: [
      "The resistance enclosed",
      "The current enclosed",
      "The total charge enclosed",
      "The magnetic field enclosed"
    ],
    answer: 2
  },
  {
    question: "The capacitance of a capacitor is measured in:",
    options: [
      "Coulomb",
      "Farad",
      "Volt",
      "Henry"
    ],
    answer: 1
  },
  {
    question: "A dielectric material placed between capacitor plates generally:",
    options: [
      "Decreases capacitance",
      "Increases capacitance",
      "Produces electric current",
      "Has no effect"
    ],
    answer: 1
  },
  {
    question: "Ohm's law is expressed as:",
    options: [
      "V = IR",
      "P = IV",
      "Q = CV",
      "F = ma"
    ],
    answer: 0
  },
  {
    question: "The magnetic field around a straight current-carrying conductor consists of:",
    options: [
      "Straight lines",
      "Elliptical lines",
      "Circular field lines",
      "Parabolic lines"
    ],
    answer: 2
  },
  {
    question: "Two charges are separated by a distance. Electrostatic force depends on:",
    options: [
      "Mass only",
      "Charge and distance",
      "Temperature only",
      "Colour of conductor"
    ],
    answer: 1
  },
  {
    question: "A charge moving through a potential difference performs:",
    options: [
      "Work",
      "Magnetism only",
      "Friction only",
      "Reflection"
    ],
    answer: 0
  },
  {
    question: "The charge stored in a capacitor is given by:",
    options: [
      "Q = CV",
      "V = IR",
      "P = IV",
      "F = qE"
    ],
    answer: 0
  },
  {
    question: "An electric current of 2A flows through a resistor of 5Ω. The voltage is:",
    options: [
      "2V",
      "5V",
      "7V",
      "10V"
    ],
    answer: 3
  },
  {
    question: "Electromagnetic induction occurs when there is:",
    options: [
      "Constant magnetic flux",
      "Change in magnetic flux",
      "Constant current only",
      "Zero magnetic field"
    ],
    answer: 1
  },
  {
    question: "According to Lenz's law, the induced current:",
    options: [
      "Enhances the change causing it",
      "Opposes the change causing it",
      "Has no direction",
      "Stops immediately"
    ],
    answer: 1
  },
  {
    question: "Maxwell predicted the existence of:",
    options: [
      "Gravitational waves",
      "Sound waves",
      "Electromagnetic waves",
      "Water waves"
    ],
    answer: 2
  },
  {
    question: "The speed of electromagnetic waves in vacuum is approximately:",
    options: [
      "3 × 10⁶ m/s",
      "3 × 10⁷ m/s",
      "3 × 10⁸ m/s",
      "3 × 10⁹ m/s"
    ],
    answer: 2
  }
];
const CSC122 = [
  {
    question: "Data can best be defined as:",
    options: [
      "Processed information",
      "Raw facts and figures",
      "A computer program",
      "A database file"
    ],
    answer: 1
  },
  {
    question: "Information is:",
    options: [
      "Unprocessed data",
      "A computer language",
      "Processed data that is meaningful",
      "A collection of files only"
    ],
    answer: 2
  },
  {
    question: "Which of the following is a source of data?",
    options: [
      "Questionnaire",
      "Observation",
      "Interview",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "The first stage in data processing is:",
    options: [
      "Processing",
      "Storage",
      "Collection of data",
      "Output"
    ],
    answer: 2
  },
  {
    question: "Which of the following is an example of electronic data processing?",
    options: [
      "Using pen and paper",
      "Using an abacus",
      "Using a computer system",
      "Using a typewriter"
    ],
    answer: 2
  },
  {
    question: "Which of the following is NOT a property of good data?",
    options: [
      "Accuracy",
      "Relevance",
      "Timeliness",
      "Ambiguity"
    ],
    answer: 3
  },
  {
    question: "A method of data collection in which information is gathered by asking questions directly is called:",
    options: [
      "Observation",
      "Measurement",
      "Interview",
      "Experiment"
    ],
    answer: 2
  },
  {
    question: "The arrangement of data into a form suitable for processing is called:",
    options: [
      "Data preparation",
      "Data distribution",
      "Data coding",
      "Data conversion"
    ],
    answer: 0
  },
  {
    question: "In batch processing, transactions are:",
    options: [
      "Processed immediately",
      "Processed one at a time as they occur",
      "Collected and processed together",
      "Sent to different computers"
    ],
    answer: 2
  },
  {
    question: "A system in which many users share the resources of a computer simultaneously is known as:",
    options: [
      "Batch processing",
      "Time-sharing processing",
      "Real-time processing",
      "Multiprocessing"
    ],
    answer: 1
  },
  {
    question: "A computer file is:",
    options: [
      "A storage location for related data",
      "A programming language",
      "A type of hardware",
      "An operating system"
    ],
    answer: 0
  },
  {
    question: "A database is best described as:",
    options: [
      "A collection of unrelated files",
      "An organized collection of related data",
      "A programming package",
      "A computer network"
    ],
    answer: 1
  },
  {
    question: "Which processing method provides immediate results after data input?",
    options: [
      "Batch processing",
      "Real-time processing",
      "Manual processing",
      "Mechanical processing"
    ],
    answer: 1
  },
  {
    question: "The process of arranging records on a storage medium for easy retrieval is known as:",
    options: [
      "File organization",
      "File conversion",
      "Data transmission",
      "Data coding"
    ],
    answer: 0
  },
  {
    question: "Which of the following is an advantage of distributed processing?",
    options: [
      "Dependence on a single computer",
      "Slower processing speed",
      "Sharing of processing tasks among several computers",
      "Increased risk of data duplication only"
    ],
    answer: 2
  },
  {
    question: "Multiprogramming is the technique whereby:",
    options: [
      "One program executes at a time",
      "Several programs reside in memory and share CPU time",
      "Several users share one terminal only",
      "Computers are connected through cables"
    ],
    answer: 1
  },
  {
    question: "The main purpose of file processing is to:",
    options: [
      "Destroy unwanted files",
      "Create software applications",
      "Store, update, retrieve and manipulate data efficiently",
      "Connect computers to the internet"
    ],
    answer: 2
  },
  {
    question: "Which of the following file organizations stores records in the order they are received?",
    options: [
      "Indexed file organization",
      "Random file organization",
      "Sequential file organization",
      "Direct file organization"
    ],
    answer: 2
  },
  {
    question: "Which of the following is an example of a transaction processing system?",
    options: [
      "Payroll system",
      "Word processor",
      "Paint program",
      "Media player"
    ],
    answer: 0
  },
  {
    question: "The primary goal of data processing is to:",
    options: [
      "Increase the size of files",
      "Produce meaningful information for decision-making",
      "Reduce the number of computers",
      "Replace human beings completely"
    ],
    answer: 1
  }
];
const CSC104 = [
  {
    question: "An application package is:",
    options: [
      "A computer hardware component",
      "A system software that manages hardware",
      "A software program designed to perform specific tasks",
      "A programming language"
    ],
    answer: 2
  },
  {
    question: "Which of the following is an example of an application package?",
    options: [
      "Operating System",
      "Microsoft Word",
      "Compiler",
      "BIOS"
    ],
    answer: 1
  },
  {
    question: "Microsoft Access is primarily used for:",
    options: [
      "Creating spreadsheets",
      "Database management",
      "Drawing graphics",
      "Browsing the internet"
    ],
    answer: 1
  },
  {
    question: "A collection of related data stored in an organized manner is called a:",
    options: [
      "Database",
      "Folder",
      "Worksheet",
      "Program"
    ],
    answer: 0
  },
  {
    question: "Microsoft PowerPoint is mainly used for:",
    options: [
      "Programming",
      "Database creation",
      "Creating presentations",
      "Data processing"
    ],
    answer: 2
  },
  {
    question: "DBMS stands for:",
    options: [
      "Data Base Management System",
      "Digital Base Management Software",
      "Data Backup Management System",
      "Database Building Management Scheme"
    ],
    answer: 0
  },
  {
    question: "In Microsoft Access, a table consists of:",
    options: [
      "Slides and animations",
      "Records and fields",
      "Rows only",
      "Columns only"
    ],
    answer: 1
  },
  {
    question: "The rows in an Access table are called:",
    options: [
      "Fields",
      "Records",
      "Queries",
      "Forms"
    ],
    answer: 1
  },
  {
    question: "A query in Microsoft Access is used to:",
    options: [
      "Delete the database automatically",
      "Search and retrieve specific information from a database",
      "Create slide transitions",
      "Format pictures"
    ],
    answer: 1
  },
  {
    question: "The first slide in a PowerPoint presentation is usually called the:",
    options: [
      "Design Slide",
      "Title Slide",
      "Master Slide",
      "Animation Slide"
    ],
    answer: 1
  },
  {
    question: "Which feature is used to apply movement effects to objects on a slide?",
    options: [
      "Transition",
      "Animation",
      "Filter",
      "Formatting"
    ],
    answer: 1
  },
  {
    question: "Slide Transition in PowerPoint refers to:",
    options: [
      "Formatting text",
      "Adding pictures",
      "The visual effect that occurs when moving from one slide to another",
      "Creating databases"
    ],
    answer: 2
  },
  {
    question: "Which of the following views in Microsoft Access allows users to modify the structure of a table?",
    options: [
      "Datasheet View",
      "Print Preview",
      "Design View",
      "Slide View"
    ],
    answer: 2
  },
  {
    question: "A field in a database is best defined as:",
    options: [
      "A collection of records",
      "A single category of information in a table",
      "The entire database file",
      "A slide in PowerPoint"
    ],
    answer: 1
  },
  {
    question: "Data filtering in Microsoft Access is used to:",
    options: [
      "Permanently delete records",
      "Display only records that meet specified conditions",
      "Encrypt the database",
      "Create relationships"
    ],
    answer: 1
  },
  {
    question: "Which of the following is an example of integrating Office packages?",
    options: [
      "Creating a folder",
      "Copying an Access chart into a PowerPoint presentation",
      "Deleting files",
      "Installing Windows"
    ],
    answer: 1
  },
  {
    question: "Graphics and multimedia involve the use of:",
    options: [
      "Text only",
      "Numbers only",
      "Images, audio, video and animations",
      "Databases only"
    ],
    answer: 2
  },
  {
    question: "In Microsoft Access, the primary key is used to:",
    options: [
      "Open the database",
      "Identify each record uniquely",
      "Sort records alphabetically only",
      "Create slide transitions"
    ],
    answer: 1
  },
  {
    question: "A presentation containing text, graphics, sound and video is called:",
    options: [
      "Spreadsheet",
      "Database",
      "Multimedia presentation",
      "Operating system"
    ],
    answer: 2
  },
  {
    question: "Which of the following best describes the relationship between Microsoft Access and Microsoft PowerPoint?",
    options: [
      "Both are operating systems",
      "Both are programming languages",
      "Both are application packages designed for different purposes",
      "Both are antivirus programs"
    ],
    answer: 2
  }
];
const COS102 = [
  {
    question: "Visual Basic (VB) is primarily a:",
    options: [
      "Database software",
      "Programming language",
      "Spreadsheet package",
      "Web browser"
    ],
    answer: 1
  },
  {
    question: "A set of instructions written to solve a problem is called:",
    options: [
      "Algorithm",
      "Compiler",
      "Database",
      "Flowchart only"
    ],
    answer: 0
  },
  {
    question: "In Visual Basic, a variable is used to:",
    options: [
      "Store data values",
      "Print documents",
      "Delete files",
      "Draw pictures only"
    ],
    answer: 0
  },
  {
    question: "Which of the following is a valid data type in Visual Basic?",
    options: [
      "Integer",
      "Printer",
      "Folder",
      "Browser"
    ],
    answer: 0
  },
  {
    question: "The command used to display information in Visual Basic is:",
    options: [
      "Close",
      "Exit",
      "MsgBox",
      "Delete"
    ],
    answer: 2
  },
  {
    question: "Which symbol is used for assignment in Visual Basic?",
    options: [
      "+",
      "=",
      "<",
      ">"
    ],
    answer: 1
  },
  {
    question: "Which control is commonly used to receive input from a user?",
    options: [
      "Label",
      "TextBox",
      "PictureBox",
      "Shape"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a branching statement in Visual Basic?",
    options: [
      "For...Next",
      "Do...Loop",
      "If...Then...Else",
      "End"
    ],
    answer: 2
  },
  {
    question: "A loop is used to:",
    options: [
      "Store files permanently",
      "Repeat a set of instructions",
      "Create databases",
      "Format a disk"
    ],
    answer: 1
  },
  {
    question: "The control used to display text that users cannot edit is:",
    options: [
      "TextBox",
      "Label",
      "Button",
      "ListBox"
    ],
    answer: 1
  },
  {
    question: "Which menu option is commonly used to execute a Visual Basic program?",
    options: [
      "Save",
      "Edit",
      "Run",
      "View"
    ],
    answer: 2
  },
  {
    question: "A syntax error occurs when:",
    options: [
      "The program runs slowly",
      "The computer shuts down",
      "The programmer violates the language rules",
      "The program produces correct output"
    ],
    answer: 2
  },
  {
    question: "What is the output of the following code?\n\nDim x As Integer\nx = 5\nx = x + 3\nMsgBox x",
    options: [
      "3",
      "5",
      "8",
      "15"
    ],
    answer: 2
  },
  {
    question: "How many times will the following loop execute?\n\nFor i = 1 To 5\nNext i",
    options: [
      "4 times",
      "5 times",
      "6 times",
      "Infinite times"
    ],
    answer: 1
  },
  {
    question: "Which of the following best describes a procedure?",
    options: [
      "A hardware device",
      "A reusable block of code that performs a specific task",
      "A database table",
      "A file extension"
    ],
    answer: 1
  },
  {
    question: "An array is:",
    options: [
      "A loop statement",
      "A collection of related data items stored under one name",
      "A database package",
      "A debugging tool"
    ],
    answer: 1
  },
  {
    question: "Which declaration creates an array of ten integers?",
    options: [
      "Dim A As Integer",
      "Dim A(10) As Integer",
      "Integer A = 10",
      "Dim Integer(10)"
    ],
    answer: 1
  },
  {
    question: "Debugging is the process of:",
    options: [
      "Installing software",
      "Writing documentation",
      "Detecting and correcting program errors",
      "Deleting source code"
    ],
    answer: 2
  },
  {
    question: "Data files are mainly used to:",
    options: [
      "Store information permanently",
      "Increase monitor size",
      "Execute hardware instructions",
      "Design graphics only"
    ],
    answer: 0
  },
  {
    question: "Consider the following code:\n\nDim n As Integer\nn = 7\n\nIf n Mod 2 = 0 Then\nMsgBox \"Even\"\nElse\nMsgBox \"Odd\"\nEnd If\n\nThe output is:",
    options: [
      "Even",
      "Odd",
      "7",
      "Error"
    ],
    answer: 1
  }
];