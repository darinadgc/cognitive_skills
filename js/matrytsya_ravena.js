document.addEventListener("DOMContentLoaded", () => {
window.resultEl = document.getElementById("result");    // const lastAttemptKey = getLastAttemptKey(); // ✅ Отримуємо ключ для LocalStorage
    // const lastAttempt = localStorage.getItem(lastAttemptKey); // ✅ Оголошуємо lastAttempt
    // const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;
   const startBtn = document.getElementById("start-btn");
const sendResultsBtnRaven = document.getElementById("send-results-raven-btn");
 const taskContainer = document.getElementById("task-container");
  const timerEl = document.getElementById("timer");
  let currentTaskIndex = 0;
  let score = 0;//  let score;
  let timerInterval;
      window.calculateLevel = function(score) {
    if (score === 10) return "Дуже високий";
    if (score >= 8) return "Високий";
    if (score >= 4) return "Середній";
    if (score >= 2) return "Низький";
    return "Дуже низький";
};
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
    sendResultsBtnRaven.style.display = "none";
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
window.calculateLevelRaven = function () {
    let score = 0;
    const answers = document.querySelectorAll('input[type="radio"]:checked');

    answers.forEach((input) => {
        if (input.value === "1") score++; // Припустимо, що правильні відповіді мають value="1"
    });

    console.log("✅ Підрахований бал:", score);
    return score;
};

 //🏁finishTest
  function finishTest() {
    clearInterval(timerInterval);
    window.resultEl.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    taskContainer.innerHTML = "";
    sendResultsBtn.style.display = "block";
  }//🏁finishTest 
});



// 🏫🧒📛 Функція для запиту імені студента
window.askStudentName = function () {
    let studentName = prompt("Введіть ваші ім'я та першу літеру прізвища:").trim();

    if (!studentName || studentName.length < 2) {
        alert("❗ Будь ласка, введіть ім'я, більше за 1 символ.");
        return null;  // ❌ Якщо ім'я некоректне, повертаємо null
    }

    // ✅ Фільтр символів у імені
    let cleanedStudentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ0-9' ]/g, "");

    return cleanedStudentName;  // ✅ Повертаємо очищене ім'я
};// 🏫🧒📛 Функція для запиту імені студента

  
window.getEntryIDs = function () {
    
 
        
        return {
            formURL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyylO6_4cpbzuD6THcT95VMAW5R7Foy1qykWDloI7Rew2b1g/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
        }
      
        return null;

  };//getEntryIDs




   if (startBtn) {
        startBtn.addEventListener("click", () => {
            console.log("✅ Початок тесту: Матриця Равена");
            startTest();
        });
    } else {
        console.error("❌ start-btn не знайдено!");
    }



window.submitResults = function(finalScore, level, entryIDs, sendStudentName) {
    console.log("📨 submitResults() запущено!");
   entryIDs = getEntryIDs();// let 
 if (!entryIDs) {
        console.error(`❌ Не вдалося знайти entry ID для тесту: ${testType}`);
        return;
    }   // let selectedEntryIDs = entryIDs ? entryIDs[testType] : null;

    if (window.isSubmitting) return;
    window.isSubmitting = true;

    console.log("✅ Функція submitResults викликана!");   

    if (!entryIDs || !entryIDs.formURL) {
        console.error("❌ Не вдалося знайти entry ID для цієї сторінки.");
        alert("❌ Помилка! Не вдалося знайти entry ID.");
        window.isSubmitting = false;
        return;
    }

    console.log("🔹 Отримані entry IDs:", entryIDs);
console.log("✅ Визначені entry IDs:", entryIDs);
    let selectedEntryIDs = entryIDs; // ✅ Правильне призначення

 //   finalScore = 0;
//    level = "";
       let finalScore = calculateScoreRaven();
       let  level = calculateLevel(finalScore);
    sendStudentName = askStudentName();
    console.log("✅ Ім'я студента:", sendStudentName);
    console.log("✅ Визначені entry IDs:", selectedEntryIDs);
    console.log("✅ Обчислений бал:", finalScore);
    console.log("✅ Визначений рівень:", level);

    // ✅ Викликаємо submitResults
   //  submitResults(selectedEntryIDs, finalScore, level, sendStudentName);
    if (!sendStudentName) {
        console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
        return;
if (isNaN(finalScore) || !level) { 

        console.error("❌ finalScore або level не визначено!");
        return;
    }
    }
    
    const formData = new URLSearchParams();
    formData.append(entryIDs.name, sendStudentName);
    formData.append(entryIDs.score, Number(finalScore));
    formData.append(entryIDs.level, String(level));

    console.log("🔹 Надсилаємо:", Object.fromEntries(formData));
    console.log("📩 Формат перед відправкою:", formData.toString());

    fetch(entryIDs.formURL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
    })
    .then(() => {
        console.log("✅ Успішно надіслано!");
        alert("✅ Дані успішно надіслані у Google Forms!");
    })
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
};// ✅ Головна функція для надсилання результатів у Google Forms



    sendResultsBtn.addEventListener("click", () => submitResults());




   // ✅ Функції обмеження повторного проходження тесту (не виконується при завантаженні)

// ✅ Функція перевірки обмежень для конкретного тесту
// function checkTestRetry(testType, retryElement) {
//     const lastAttemptKey = `lastAttempt${testType}`;
//     const lastAttempt = localStorage.getItem(lastAttemptKey);
//     const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;

//     if (lastAttemptDate && !isAllowedToRetry(lastAttemptDate)) {
	

//         retryElement.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(lastAttemptDate)} днів.`;
//         return false;
//     }

//     return true;
// }

// ✅ Додаємо обробники подій на заголовки тестів
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("figures-title").addEventListener("click", () => {
//         checkTestRetry("Figures", document.getElementById("figures-panel"));
//     });

//     document.getElementById("raven-title").addEventListener("click", () => {
//         checkTestRetry("Raven", document.getElementById("raven-panel"));
//     });

//     document.getElementById("motivation-title").addEventListener("click", () => {
//         checkTestRetry("Motivation", document.getElementById("motivation-panel"));
//     });
// });







//    function getLastAttemptKey() {
//     const currentPage = window.location.pathname;
//     if (currentPage.includes("cognitive_skills/")) return "lastAttemptMotivation";
//     if (currentPage.includes("matrytsya_ravena.html")) return "lastAttemptRaven";
//     if (currentPage.includes("upiznay_fihury.html")) return "lastAttemptFigures";
//     return "lastAttemptDefault";
// }

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








    // if (lastAttempt && !isAllowedToRetry(new Date(lastAttempt))) {
    //     resultEl.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(new Date(lastAttempt))} днів.`;
    //     sendResultsBtn.disabled = true;
    //     return;
    // }


