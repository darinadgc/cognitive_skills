   // ❌❌❌❌❌❌❌❌❌❌❌❌❌ Функції обмеження повторного проходження тесту 

// Визначення функції getLastAttemptKey
function getLastAttemptKey() {
    return "lastAttemptFigures";
}
// ✅ Функція перевірки обмежень 
function checkTestRetry(retryElement) {
    const lastAttemptKey = getLastAttemptKey();
    const lastAttempt = localStorage.getItem(lastAttemptKey);
    const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;

    console.log("lastAttempt:", lastAttempt); // Лог для перевірки збережених даних
    console.log("lastAttemptDate:", lastAttemptDate); // Лог для перевірки дати

    if (lastAttemptDate && !isAllowedToRetry(lastAttemptDate)) {
        retryElement.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(lastAttemptDate)} днів.`;
        return false;
    }

    return true;
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
document.addEventListener("DOMContentLoaded", () => {
  const figureTaskEl = document.getElementById("figure-task");
  const startBtn = document.getElementById("start-btn");
  const timerEl = document.getElementById("timer");
 const header = document.querySelector("header");
    	// const bodyContent = document.querySelector("body");
    	 const main = document.querySelector("main");
    	 const footer = document.querySelector("footer");
    // Виклик функції перевірки обмежень
    if (!checkTestRetry(main)) {
        console.log("❌ Ви вже проходили тест. Повідомлення відображено.");
        return; // Зупиняємо подальше виконання, якщо тест вже був пройдений
    }

   window.figureTask = document.getElementById("figure-task");
    window.resultEl = document.getElementById("result");
  const gameContainer = document.getElementById("game-container");
   // const lastAttemptKey = getLastAttemptKey(); // ✅ Отримуємо ключ для LocalStorage
    // const lastAttempt = localStorage.getItem(lastAttemptKey); // ✅ Оголошуємо lastAttempt
    // const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;
window.sendResultsBtn = document.getElementById("send-results-btn");
 let timerInterval;
     //📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶📶
	window.calculateLevel = function(score) {
      console.log("🔍 Поточний score (calculateLevel):", score);
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
    { id: 9, image: "img/upiznay_fihury/upiznay_fihury9.png", correct: 1 },
    { id: 10, image: "img/upiznay_fihury/upiznay_fihury10.png", correct: 3 }
  ];
  let unansweredTasks = [...tasks]; 
  let incorrectAnswers = []; 
  let currentTask = null;
console.log("📌 Всі завдання перед початком тесту:", tasks);
  startBtn.addEventListener("click", startTest);
//🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛🔛
function startTest() {
    window.startTime = Date.now();
    score = 0;
    unansweredTasks = [...tasks];
    incorrectAnswers = [];
    document.getElementById("figure-task").style.display = "block";
    startBtn.style.display = "none";
    sendResultsBtn.style.display = "none";
    startTimer(90);
    generateTask();
}

//⏳⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛
function startTimer(duration) {
    let timeLeft = duration;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `⏳ ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) { // ⏳ Час вийшов
            clearInterval(timerInterval);
            finishTest(); // ⛔ Автоматично завершуємо тест
        }
    }, 1000);
}

let score = 0;  // Оголошуємо змінну на глобальному рівні
	//➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
function generateTask() {
    console.log("🔍 Поточний score:", score);
    console.log("🟢 unansweredTasks перед оновленням:", unansweredTasks);
    console.log("🔴 incorrectAnswers перед оновленням:", incorrectAnswers);

    gameContainer.classList.add("container-active");

    if (unansweredTasks.length === 0 && incorrectAnswers.length === 0) {
        console.log("✅ Всі завдання виконані. Завершуємо тест.");
        finishTest();
        return;
    }

    if (unansweredTasks.length > 0) {
        currentTask = unansweredTasks.shift();
    } else if (incorrectAnswers.length > 0) {
        currentTask = incorrectAnswers.shift();
    }

    console.log("🟢 unansweredTasks після оновлення:", unansweredTasks);
    console.log("🔴 incorrectAnswers після оновлення:", incorrectAnswers);
    console.log("🟪 tasks:", tasks);

    if (score === 10 && incorrectAnswers.length === 0) {
        finishTest();
        return;
    }

    if (!currentTask) {
        console.error("⚠️ Поточне завдання undefined, завершення тесту.");
        finishTest();
        return;
    }

    const optionsHTML = [1, 2, 3, 4].map(num => ` 
        <img class="option" src="img/upiznay_fihury/upiznay_fihury${currentTask.id}_${num}.png" data-index="${num}">
    `).join("");

    console.log("🎯 Згенеровані варіанти:", optionsHTML);

    figureTaskEl.innerHTML = ` 
        <img src="${currentTask.image}" class="main-image"> 
        <div class="options">${optionsHTML}</div>
    `;

    setTimeout(() => {
        document.querySelectorAll(".option").forEach(option => {
            option.addEventListener("click", () => checkAnswer(Number(option.dataset.index)));
        });
    }, 50);

    header.classList.add("low-opacity");
    footer.classList.add("container-color");
    main.classList.add("container-color");
    resultEl.classList.add("container-color");
}
//✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

function checkAnswer(selectedIndex) {
    if (selectedIndex === currentTask.correct) {
        score++;
        incorrectAnswers = incorrectAnswers.filter(task => task.id !== currentTask.id);
    } else {
        if (!incorrectAnswers.some(task => task.id === currentTask.id)) {
            incorrectAnswers.push({ ...currentTask });
        }
        unansweredTasks.push(currentTask); // Ensure the incorrect task is retried.
    }

    setTimeout(generateTask, 1);
}



	// 🔢🎯🔢🎯🎯🎯🔢🔢🎯🎯🎯🔢🎯🎯🔢🔢
window.calculateScore = function(timeTaken) {
   // if (typeof timeTaken !== "number" || isNaN(timeTaken)) {
       // console.error("❌ Неправильне значення timeTaken:", timeTaken);
       // return 0; // Запобігає undefined
   // }

    console.log("⌛ Час витрачений:", timeTaken);

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


//🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁finishTest
 function finishTest() {
    const timeTaken = Math.floor((Date.now() - window.startTime) / 1000);
 //const timeTaken = Math.floor((Date.now() - window.startTime) / 1000); Час витрачений в секундах
    console.log("⌛ Час витрачений на тест (у finishTest):", timeTaken);
    if (timeTaken > 90) {
        console.log("Тест завершено через перевищення ліміту часу.");
    }
    clearInterval(timerInterval);
    resultEl.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    figureTaskEl.innerHTML = "";
    sendResultsBtn.style.display = "block";
header.classList.remove("low-opacity"); 
         gameContainer.classList.remove("container-active");

footer.classList.remove("container-color");
main.classList.remove("container-color");
resultEl.classList.remove("container-color");
    // ✅ Збереження finalScore в глобальну змінну
     window.finalScore = calculateScore(timeTaken);
    console.log("🎯 Обчислений бал:", window.finalScore);

}

//🏁finishTest


// 🏫🧒📛 Функція для запиту імені студента
window.askStudentName = function () {
    let studentName = prompt("Введіть ваші ім'я та першу літеру прізвища:").trim();

    if (!studentName || studentName.length < 2) {
        alert("❗ Будь ласка, введіть ім'я, більше за 1 символ.");
        return null;  // ❌ Якщо ім'я некоректне, повертаємо null
    }

    // ✅ Фільтр символів у імені
    let cleanedStudentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ0-9.' ]/g, "");

    return cleanedStudentName;  // ✅ Повертаємо очищене ім'я
};// 🏫🧒📛 Функція для запиту імені студента

  //🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔
window.getEntryIDs = function () {
// Перетворюємо першу літеру в велику, решту — в малі
  

        
        return {
            formURL: "https://docs.google.com/forms/d/e/1FAIpQLSfSJTHeQHKjxr-_Nfwr0qC1-5Rinq1xGevQ4i8yFKegE9Wfyw/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
        }
        return null;
   };//getEntryIDs      
   
// Додання обробника події до кнопки надсилання результатів
sendResultsBtn.addEventListener("click", () => {
    submitResults(score, level, getEntryIDs(), sendStudentName);
});
//📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨
// Оголошення функції submitResults на глобальному рівні
 window.submitResults = function(finalScore, level, entryIDs, sendStudentName) {
    console.log("📨 submitResults() запущено!");
    entryIDs = getEntryIDs();
    if (!entryIDs) {
        console.error(`❌ Не вдалося знайти entry ID для тесту`);
        return;
    }
    if (window.isSubmitting) return;
    window.isSubmitting = true;

    console.log("✅ Функція submitResults викликана!");

    if (!entryIDs || !entryIDs.formURL) {
        console.error("❌ Не вдалося знайти entry ID для цієї сторінки.");
        alert("❌ Помилка! Не вдалося знайти entry ID.");
        window.isSubmitting = false;
        return;
    }

    sendStudentName = askStudentName();
    if (!sendStudentName) {
        console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
        window.isSubmitting = false;
        return;
    }    console.log("✅ Ім'я студента:", sendStudentName);

    

   // if (typeof timeTaken === "undefined") {
      //  console.error("❌ Час не визначено! Неможливо розрахувати бал.");
       // return;
   // }
// Define the timeTaken variable here
    

    //console.log("🎯 Обчислений бал:", window.finalScore); Переносимо обчислення finalScore сюди
    
    

    // Обчислення рівня
    level = calculateLevel(window.finalScore);
    console.log("✅ Визначений рівень:", level);
    console.log("✅ Ім'я студента:", sendStudentName);
    console.log("✅ Визначені entry IDs:", entryIDs);

    console.log("🔹 Отримані entry IDs:", entryIDs);

    const formData = new URLSearchParams();
    formData.append(entryIDs.name, sendStudentName);
    formData.append(entryIDs.score, Number(window.finalScore));
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
        resultEl.innerHTML = `<strong>Дякуємо за проходження! Успіхів!</strong>`;
          // Зберігаємо дату останньої спроби в localStorage
        localStorage.setItem(getLastAttemptKey(), new Date().toISOString());
        console.log("✅ Дата останньої спроби збережена:", new Date().toISOString());
    })
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
}
 });// DOMContentLoaded


