document.addEventListener("DOMContentLoaded", () => {
  const figureTaskEl = document.getElementById("figure-task");
  const startBtn = document.getElementById("start-btn");
  const timerEl = document.getElementById("timer");
    window.resultEl = document.getElementById("result");
   // const lastAttemptKey = getLastAttemptKey(); // ✅ Отримуємо ключ для LocalStorage
    // const lastAttempt = localStorage.getItem(lastAttemptKey); // ✅ Оголошуємо lastAttempt
    // const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;
const sendResultsBtn = document.getElementById("send-results-btn");
 let timerInterval;
     //📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶
	window.calculateLevel = function(score) {
    if (score === 10) return "Дуже високий";
    if (score >= 8) return "Високий";
    if (score >= 4) return "Середній";
    if (score >= 2) return "Низький";
    return "Дуже низький";
};
// sendResultsBtns.forEach((btn) => {
//     console.log("🔹 Кнопка знайдена:", btn, "| data-test-type:", btn.dataset.testType);
// });
//🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
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
    // if (startBtnFigures) {
    //     startBtnFigures.addEventListener("click", () => {
    //         console.log("✅ Початок тесту: Упізнай фігури");	
    //         startTest();
    //     });
    // } else {
    //     console.error("❌ start-btn-figures не знайдено!");
    // }
  startBtn.addEventListener("click", startTest);
//🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛
  function startTest() {
    window.startTime = Date.now(); // Записуємо час початку тесту
    
    unansweredTasks = [...tasks];
    incorrectAnswers = [];
    score = 0;
    startBtn.style.display = "none";
    sendResultsBtn.style.display = "none";
    document.getElementById("figure-task").style.display = "block";

    startTimer(90);
    generateTask();
  }
//⏳⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛
 function startTimer(duration) {
    let timeLeft = duration;
    window.startTime = Date.now(); // ✅ Фіксуємо початок тесту!

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `⏳ ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            
            // ✅ Визначаємо timeTaken перед викликом finishTest()
            window.timeTaken = Math.floor((Date.now() - window.startTime) / 1000);
            console.log("⌛ Час витрачений на тест:", window.timeTaken);

            finishTest();
        }
    }, 1000);
}

//➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
  function generateTask() {
    if (score === 10 && incorrectAnswers.length === 0) {
if (score === 10 && incorrectAnswers.length === 0) {
    window.timeTaken = Math.floor((Date.now() - window.startTime) / 1000);
    console.log("⌛ Час витрачений на тест (generateTask):", window.timeTaken);
    finishTest();
    return;
}
      finishTest();
      return;
    }

    currentTask = unansweredTasks.length > 0
      ? unansweredTasks.shift()
      : incorrectAnswers.shift(); 

    figureTaskEl.innerHTML = `
      <img src="${currentTask.image}" class="main-image" id="main-image-figures">
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
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
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
//🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁finishTest

  function finishTest() {
    clearInterval(timerInterval);
   let timeTaken = Math.floor((Date.now() - window.startTime) / 1000);
console.log("⌛ Час витрачений на тест:", timeTaken);
 resultEl.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    figureTaskEl.innerHTML = "";
    sendResultsBtn.style.display = "block";
    //window.timeTaken = timeTaken; Додатково збережемо timeTaken глобально
    
  }//🏁finishTest
	// 🔢🎯🔢🎯🎯🎯🔢🔢🎯🎯🎯🔢🎯🎯🔢🔢
window.calculateScore = function(timeTaken) {
    if (typeof timeTaken !== "number" || isNaN(timeTaken)) {
        console.error("❌ Неправильне значення timeTaken:", timeTaken);
        return 0; // Запобігання помилкам
    }
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

  //🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔
window.getEntryIDs = function () {
// Перетворюємо першу літеру в велику, решту — в малі
  

        
        return {
            formURL: "https://docs.google.com/forms/d/e/1FAIpQLSfSJTHeQHKjxr-_Nfwr0qC1-5Rinq1xGevQ4i8yFKegE9Wfyw/formResponse",
            name: "entry.511676966",
            score: "entry.1332224844",
            level: "entry.1008291282"
        }
      
        return null;
  };//getEntryIDs 
console.log("⏳ Значення window.timeTaken перед обчисленням балу:", window.timeTaken);

//let finalScore = calculateScore(window.timeTaken);
//console.log("📌 Значення window.timeTaken перед викликом submitResults:", window.timeTaken);	
// 	📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧
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

 //  let  finalScore = 0;
//    let  level = "";finalScore = calculateScore(timeTaken);
console.log("⏳ Час перед обчисленням балу:", timeTaken);

console.log("🎯 Обчислений бал:", finalScore);
       level = calculateLevel(finalScore);
    sendStudentName = askStudentName();
    console.log("✅ Ім'я студента:", sendStudentName);
    console.log("✅ Визначені entry IDs:", selectedEntryIDs);
    console.log("✅ Обчислений бал:", finalScore);
    console.log("✅ Визначений рівень:", level);


    // ✅ Викликаємо submitResults
    // submitResults(selectedEntryIDs, finalScore, level, sendStudentName);
    if (!sendStudentName) {
        console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
        return;
if (isNaN(finalScore) || !level) { 

        console.error("❌ finalScore або level не визначено!");
        return;
    }
}// 
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
    document.getElementById("send-results-btn").style.display = "none";
        resultEl.innerHTML = `<strong>Дякуємо за проходження!</strong>`;
})
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
};// ✅ Головна функція для надсилання результатів у Google Forms
// ✅ Головна функція для надсилання результатів у Google Forms
sendResultsBtn.addEventListener("click", () => {
    if (typeof window.timeTaken !== "number" || isNaN(window.timeTaken)) {
        console.error("❌ Неправильне значення timeTaken:", window.timeTaken);
        alert("❌ Час тесту не визначено! Спробуйте ще раз.");
        return;
    }

    let finalScore = calculateScore(window.timeTaken);
    let level = calculateLevel(finalScore);
    let entryIDs = getEntryIDs();
    let studentName = askStudentName();

    console.log("📌 Викликаємо submitResults з балом:", finalScore);
    console.log("📌 Значення window.timeTaken перед викликом submitResults:", window.timeTaken);

    submitResults(finalScore, level, entryIDs, studentName);
});
   // ❌❌❌❌❌❌❌❌❌❌❌❌❌❌✅ Функції обмеження повторного проходження тесту (не виконується при завантаженні)

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
 


  
  
});//DOMContentLoaded
