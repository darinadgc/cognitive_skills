document.addEventListener("DOMContentLoaded", () => {
  const figureTaskEl = document.getElementById("figure-task");
  const startBtn = document.getElementById("start-btn");
  const timerEl = document.getElementById("timer");


  const tasks = [
    { id: 1, image: "img/upiznay_fihury/upiznay_fihury1.png", correct: 2 },
    { id: 2, image: "img/upiznay_fihury/upiznay_fihury2.png", correct: 3 },
    { id: 3, image: "img/upiznay_fihury/upiznay_fihury3.png", correct: 1 },
    { id: 4, image: "img/upiznay_fihury/upiznay_fihury4.png", correct: 2 },
    { id: 5, image: "img/upiznay_fihury/upiznay_fihury5.png", correct: 4 },
    { id: 6, image: "img/upiznay_fihury/upiznay_fihury6.png", correct: 3 },
    { id: 7, image: "img/upiznay_fihury/upiznay_fihury7.png", correct: 1 },
    { id: 8, image: "img/upiznay_fihury/upiznay_fihury8.png", correct: 4 },
    { id: 9, image: "img/upiznay_fihury/upiznay_fihury9.png", correct: 3 },
    { id: 10, image: "img/upiznay_fihury/upiznay_fihury10.png", correct: 2 }
  ];

  let unansweredTasks = [...tasks]; 
  let incorrectAnswers = []; 
  let currentTask = null;
  let score = 0;
  let timerInterval;

  startBtn.addEventListener("click", startTest);

  function startTest() {
    unansweredTasks = [...tasks];
    incorrectAnswers = [];
    score = 0;
    startBtn.style.display = "none";
    sendResultsBtn.style.display = "none";
    document.getElementById("figure-task").style.display = "block";

    startTimer(90);
    generateTask();
  }

  function startTimer(duration) {
    let timeLeft = duration;

    timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerEl.textContent = `⏳ ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(timerInterval);
        finishTest();
      }
    }, 1000);
  }

  function generateTask() {
    if (score === 10 && incorrectAnswers.length === 0) {
      finishTest();
      return;
    }

    currentTask = unansweredTasks.length > 0
      ? unansweredTasks.shift()
      : incorrectAnswers.shift(); 

    figureTaskEl.innerHTML = `
      <img src="${currentTask.image}" class="main-image">
      <div class="options">
        ${[1, 2, 3, 4].map(num => `
          <img class="option" src="img/upiznay_fihury/upiznay_fihury${currentTask.id}_${num}.png" data-index="${num}">
        `).join("")}
      </div>
    `;

    document.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", () => checkAnswer(Number(option.dataset.index)));
    });
  }

  function checkAnswer(selectedIndex) {
    if (selectedIndex === currentTask.correct) {
      score++;
      incorrectAnswers = incorrectAnswers.filter(task => task.id !== currentTask.id);
    } else {
      if (!incorrectAnswers.some(task => task.id === currentTask.id)) {
        incorrectAnswers.push(currentTask);
      }
    }
    setTimeout(generateTask, 1);
  }
window.calculateScoreFigures = function(timeTaken) {
    if (timeTaken < 45) return 10;
    if (timeTaken <= 47) return 9;
    if (timeTaken <= 49) return 8;
    if (timeTaken <= 52) return 7;
    if (timeTaken <= 59) return 6;
    if (timeTaken <= 62) return 5;
    if (timeTaken <= 69) return 4;
    if (timeTaken <= 72) return 3;
    if (timeTaken <= 79) return 2;
    if (timeTaken <= 82) return 1;
    return 0;
};

//🏁finishTest
  function finishTest() {
    clearInterval(timerInterval);
    resultEl.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    figureTaskEl.innerHTML = "";
    sendResultsBtn.style.display = "block";
  }//🏁finishTest

  // function handleSendResults() {
  //   const studentName = prompt("Введіть ваше ім'я:");
  
  //   if (!studentName || studentName.trim() === "") {
  //     alert("❗ Будь ласка, введіть ім'я.");
  //     return;
  //   }
  
  //   const finalScore = score; 
  //   const level = calculateLevel(finalScore); 
  
  //   submitResults(finalScore, level, scriptURL, studentName);
  
  //   // ✅ Приховуємо кнопку після надсилання
  //   sendResultsBtn.style.display = "none";
  // }
  
  
});//DOMContentLoaded
