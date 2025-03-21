document.addEventListener("DOMContentLoaded", () => {
  const taskContainer = document.getElementById("task-container");
  const startBtn = document.getElementById("start-btn");
  const timerEl = document.getElementById("timer");

  let currentTaskIndex = 0;
  let score = 0;
  let timerInterval;

  const tasks = [
    { image: "img/matrytsya_ravena/matrytsya_ravena1.jpg", correct: 7 },
    { image: "img/matrytsya_ravena/matrytsya_ravena2.jpg", correct: 6 },
    { image: "img/matrytsya_ravena/matrytsya_ravena3.jpg", correct: 6 },
    { image: "img/matrytsya_ravena/matrytsya_ravena4.jpg", correct: 1 },
    { image: "img/matrytsya_ravena/matrytsya_ravena5.jpg", correct: 2 },
    { image: "img/matrytsya_ravena/matrytsya_ravena6.jpg", correct: 5 },
    { image: "img/matrytsya_ravena/matrytsya_ravena7.jpg", correct: 6 },
    { image: "img/matrytsya_ravena/matrytsya_ravena8.jpg", correct: 1 },
    { image: "img/matrytsya_ravena/matrytsya_ravena9.jpg", correct: 3 },
    { image: "img/matrytsya_ravena/matrytsya_ravena10.jpg", correct: 5 }
  ];

  // ✅ Додаємо обробник події ПІСЛЯ оголошення функції
  startBtn.addEventListener("click", startTest);

  function startTest() {
    console.log("🔹 startTest() запущено!");
    currentTaskIndex = 0;
    score = 0;
    taskContainer.style.display = "flex";
    startBtn.style.display = "none";
    sendResultsBtn.style.display = "none";
    startTimer(600);
    loadTask();
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

  function loadTask() {
    const task = tasks[currentTaskIndex];

    taskContainer.innerHTML = `
      <img src="${task.image}" class="main-image">
      <div class="next-div">
        <button id="next-btn">Далі</button>
        <ol class="radio-options">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(num => `
            <li>
              <input type="radio" name="task" id="option-${num}" value="${num}">
              <label for="option-${num}">${num}</label>
            </li>
          `).join('')}
        </ol>
      </div>
    `;

    document.getElementById("next-btn").addEventListener("click", checkAnswer);
  }
//✅ checkAnswer
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="task"]:checked');
    if (!selectedOption) {
      alert("Оберіть відповідь перед переходом до наступного завдання.");
      return;
    }

    const userAnswer = parseInt(selectedOption.value);
    if (userAnswer === tasks[currentTaskIndex].correct) {
      score++;
    }

    currentTaskIndex++;
    if (currentTaskIndex < tasks.length) {
      loadTask();
    } else {
      finishTest();
    }
  }//✅ checkAnswer
//🏁finishTest
  function finishTest() {
    clearInterval(timerInterval);
    window.resultEl.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    taskContainer.innerHTML = "";
    sendResultsBtn.style.display = "block";
  }//🏁finishTest
  
});