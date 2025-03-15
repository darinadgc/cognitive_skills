document.addEventListener("DOMContentLoaded", () => {
  const sendResultsBtn = document.getElementById("send-results-btn");
  window.resultEl = document.getElementById("result");


  const lastAttemptKey = getLastAttemptKey(); // ✅ Для кожного тесту свій ключ
  const lastAttempt = localStorage.getItem(lastAttemptKey);

  
  window.calculateScore = function() {
    const questions = document.querySelectorAll('input[type="radio"]');
    let score = 0;
  
    questions.forEach((input) => {
      if (input.checked && input.value === "1") {
        score++;
      }
    });
  
    return score;
  }
  window.calculateLevel = function(score) {
    if (score === 10) return "Дуже високий";
    if (score >= 8) return "Високий";
    if (score >= 4) return "Середній";
    if (score >= 2) return "Низький";
    return "Дуже низький";
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const sendResultsBtn = document.getElementById("send-results-btn");
    window.resultEl = document.getElementById("result");
  
    const lastAttemptKey = getLastAttemptKey(); // ✅ Для кожного тесту свій ключ
    const lastAttempt = localStorage.getItem(lastAttemptKey);
  
    
  
    // ✅ Функція для підрахунку балів
    window.calculateScore = function() {
      const questions = document.querySelectorAll('input[type="radio"]');
      let score = 0;
  
      questions.forEach((input) => {
        if (input.checked && input.value === "1") {
          score++;
        }
      });
  
      return score;
    }
  
    // ✅ Якщо є кнопка, додаємо обробник події для надсилання результату
    if (sendResultsBtn) {
      sendResultsBtn.addEventListener("click", () => {
        const finalScore = calculateScore(); 
        const level = calculateLevel(finalScore);
        const scriptURL = getScriptURL(); 
        submitResults(finalScore, level, scriptURL);
      });
    }
  });
  
  
  window.getScriptURL = function() {
    const currentPage = window.location.pathname;
  
    if (currentPage.includes("figures")) {
      return "https://script.google.com/macros/s/AKfycbyHPX-5dhnfRK-0iTnStfGJ8JIbI5bzzhJlIh6omNJGfnErFqlqtqVWbhXsrEH9dzmUIw/exec";
    }
  
    if (currentPage.includes("matrytsya_ravena")) {
      return "https://script.google.com/macros/s/AKfycbxhucGaceo5tAFqeMjuw3K_QpDKZEVFhNoczMmCll3ubpdTpxpW2IoDSnO9emYE8smGNQ/exec";
    }
  
    if (currentPage.includes("motivation")) {
      return "https://script.google.com/macros/s/AKfycbwKY7-VHqGRwjShwJsaUrHrUq1dWEguFEfuC4o1WUnzUfxoXZRaEsBGlJQvLXEED49ZPA/exec";
    }
  
    return null;
  }
  
 


  window.submitResults = function(finalScore, level, scriptURL, studentName) {
    if (!studentName || studentName.trim() === "") {
      alert("❗ Будь ласка, введіть ім'я.");
      return;
    }
  
    document.addEventListener("DOMContentLoaded", () => {
    const taskContainer = document.getElementById("task-container");
    const startBtn = document.getElementById("start-btn");
    const timerEl = document.getElementById("timer");
    const resultEl = document.getElementById("result");
    const sendResultsBtn = document.getElementById("send-results-btn");

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

    let currentTaskIndex = 0;
    let score = 0;
    let startTime, endTime;
    let resultSent = false;

    const scriptURL = "https://script.google.com/macros/s/AKfycbzhrXAEE2c364HvlMm0NCIqMOEODEflaLIuoGG-S6VO4Fdgf4sXHt7YSHdPU_HTIOjY6g/exec";

    const lastAttempt = localStorage.getItem("lastAttemptRaven");

    if (lastAttempt && !isAllowedToRetry(lastAttempt)) {
        resultEl.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(lastAttempt)} днів.`;
        startBtn.disabled = true;
        return;
    }

    startBtn.addEventListener("click", startTest);
    sendResultsBtn.addEventListener("click", submitResults);

    function startTest() {
        currentTaskIndex = 0;
        score = 0;
        resultSent = false;
        resultEl.innerHTML = "";
        sendResultsBtn.style.display = "none";
        startBtn.style.display = "none";
        taskContainer.style.display = "block";

        startTime = new Date();
        loadTask(currentTaskIndex);
    }

    function loadTask(index) {
        const task = tasks[index];

        taskContainer.innerHTML = `
            <img src="${task.image}" class="main-image">
            <ol class="radio-options">
                ${[1, 2, 3, 4, 5, 6, 7, 8].map(num => `
                    <li>
                        <input type="radio" name="task" id="option-${num}" value="${num}">
                        <label for="option-${num}">${num}</label>
                    </li>
                `).join('')}
            </ol>
            <button id="next-btn">Далі</button>
        `;

        document.getElementById("next-btn").addEventListener("click", checkAnswer);
    }

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
            loadTask(currentTaskIndex);
        } else {
            finishTest();
        }
    }

    function finishTest() {
        endTime = new Date();
        const totalTime = Math.floor((endTime - startTime) / 1000);

        resultEl.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
        taskContainer.innerHTML = "";
        sendResultsBtn.style.display = "block";
    }

    function submitResults() {
        if (resultSent) return;

        const studentName = prompt("Введіть ваше ім'я:");
        if (!studentName) {
            alert("Будь ласка, введіть ім'я для надсилання результатів.");
            return;
        }

        const totalTime = Math.floor((endTime - startTime) / 1000);
        const level = calculateLevel(totalTime);
        const time = new Date().toLocaleString();

        fetch(scriptURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: studentName,
    score: finalScore,
    level: level
  })
})
.then(response => response.json())
.then(data => console.log("✅ Успішно надіслано:", data))
.catch(error => console.error("❌ Помилка надсилання:", error));


    }

    function calculateLevel(score) {
        if (score === 10) return "Дуже високий";
        if (score >= 8) return "Високий";
        if (score >= 4) return "Середній";
        if (score >= 2) return "Низький";
        return "Дуже низький";
    }

    function isAllowedToRetry(lastAttempt) {
        const now = new Date();
        const lastDate = new Date(lastAttempt);
        const daysPassed = (now - lastDate) / (1000 * 60 * 60 * 24);
        return daysPassed >= 21; 
    }

    function daysUntilRetry(lastAttempt) {
        const now = new Date();
        const lastDate = new Date(lastAttempt);
        const daysPassed = (now - lastDate) / (1000 * 60 * 60 * 24);
        return Math.ceil(21 - daysPassed);
    }
});

  // ✅ Приховуємо кнопку після надсилання
  sendResultsBtn.style.display = "none";
  
  }
  
  
  function isAllowedToRetry(lastAttemptDate) {
    const now = new Date();
    const daysPassed = (now - lastAttemptDate) / (1000 * 60 * 60 * 24);
    return daysPassed >= 21; // Через 3 тижні
  }

  function daysUntilRetry(lastAttemptDate) {
    const now = new Date();
    const daysPassed = (now - lastAttemptDate) / (1000 * 60 * 60 * 24);
    return Math.ceil(21 - daysPassed);
  }
 

// ✅ Перевіряємо, чи можна пройти тест через 3-4 тижні
// if (lastAttempt && !isAllowedToRetry(new Date(lastAttempt))) {
//   resultEl.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(new Date(lastAttempt))} днів.`;
//   sendResultsBtn.disabled = true;
//   return;
// }


  function getLastAttemptKey() {
    const currentPage = window.location.pathname;
    if (currentPage.includes("motivation")) return "lastAttemptMotivation";
    if (currentPage.includes("matrytsya_ravena")) return "lastAttemptRaven";
    if (currentPage.includes("figures")) return "lastAttemptFigures";
  }
});

