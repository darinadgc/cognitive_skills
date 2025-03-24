document.addEventListener("DOMContentLoaded", () => {
    window.resultElMotivation = document.getElementById("result-motivation");
    window.resultElFigures = document.getElementById("result-figures");
    window.resultElRaven = document.getElementById("result-raven");
    // const lastAttemptKey = getLastAttemptKey(); // ✅ Отримуємо ключ для LocalStorage
    // const lastAttempt = localStorage.getItem(lastAttemptKey); // ✅ Оголошуємо lastAttempt
    // const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;
document.getElementById("send-results-motivation-btn").addEventListener("click", () => submitTestResults("motivation"));
    document.getElementById("send-results-figures-btn").addEventListener("click", () => submitTestResults("figures"));
    document.getElementById("send-results-raven-btn").addEventListener("click", () => submitTestResults("raven"));
  const startBtnFigures = document.getElementById("start-btn-figures");
  const startBtnRaven = document.getElementById("start-btn-raven");
 let timerIntervalFigures;
  let score;
  let timerIntervalRaven;

// ACCORDION
let acc = document.getElementsByClassName("accordion");
	
let i; 
	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
	    this.classList.toggle("active");
	    let panel = this.nextElementSibling;
	    if (panel.style.maxHeight){
	      panel.style.maxHeight = null;
	    } else {
	      panel.style.maxHeight = panel.scrollHeight + "1px";
	    }; 
	  });
	};   
//💗💗💗💗💗💗💗💗
window.checkAllAnsweredMotivation = function() {
    const questions = document.querySelectorAll('input[type="radio"]');
    const totalQuestions = new Set();
    const answeredQuestions = new Set();
    let score = 0; // Загальний бал

    // ✅ Додаємо питання за `name`, а не за `value`
    questions.forEach((input) => totalQuestions.add(input.name));

    questions.forEach((input) => {
        if (input.checked) {
            answeredQuestions.add(input.name);
            score += parseInt(input.value) || 0; // Додаємо бал
        }
    });

    console.log("🔹 Загальна кількість питань:", totalQuestions.size);
    console.log("🔹 Відповіді:", answeredQuestions.size);
    console.log("🔹 Обчислений бал:", score);

    return { totalQuestions, answeredQuestions, score };
};
window.calculateScoreMotivation = function() {
    let checkedAnswers = document.querySelectorAll('input[type="radio"]:checked'); // ✅ Отримуємо відповіді
    let score = 0; // Загальний бал

        checkedAnswers.forEach((input) => {
        score += parseInt(input.value) || 0; // ✅ Додаємо бали
    });

    console.log("🔹 Обчислений бал:", score); // ✅ Переносимо до return
    return score;
}
window.getLevelMotivation = function(score) {
    if (score > 13) return "Високий";
    if (score > 7) return "Середній";
    return "Низький";
};
//🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔
 
 const taskContainerRaven = document.getElementById("task-container-raven");
  const timerElRaven = document.getElementById("timer-raven");
  

  const tasksRaven = [
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
  startBtnRaven.addEventListener("click", startTestRaven);

  function startTestRaven() {
    console.log("🔹 startTest() запущено!");
    currentTaskIndex = 0;
    score = 0;
    taskContainerRaven.style.display = "flex";
    startBtnRaven.style.display = "none";
    sendResultsBtnRaven.style.display = "none";
    startTimer(600);
    loadTask();
  }

  function startTimerRaven(duration) {
    let timeLeft = duration;

    timerIntervalRaven = setInterval(() => {
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

  function loadTaskRaven() {
let currentTaskIndex = 0;
    const taskRaven = tasksRaven[currentTaskIndex];

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

    document.getElementById("next-btn").addEventListener("click", checkAnswerRaven);
  }
//✅ checkAnswer
  function checkAnswerRaven() {
    const selectedOption = document.querySelector('input[name="task"]:checked');
    if (!selectedOption) {
      alert("Оберіть відповідь перед переходом до наступного завдання.");
      return;
    }

    const userAnswerRaven = parseInt(selectedOption.value);
    if (userAnswerRaven === tasks[currentTaskIndexRaven].correct) {
      score++;
    }

    currentTaskIndexRaven++;
    if (currentTaskIndexRaven < tasks.length) {
      loadTask();
    } else {
      finishTest();
    }
  }//✅ checkAnswer
window.calculateLevelRaven = function () {
    let score = 0;
       const answers = document.querySelectorAll('.radio-options input[type="radio"]:checked');
 answers.forEach((input) => {
        if (input.value === "1") score++; // Припустимо, що правильні відповіді мають value="1"
    });

    console.log("✅ Підрахований бал:", score);
    return score;
};

 //🏁finishTest
  function finishTestRaven() {
    clearInterval(timerInterval);
    window.resultElRaven.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    taskContainer.innerHTML = "";
    sendResultsBtnRaven.style.display = "block";
  }//🏁finishTest 

    //🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
    const figureTaskEl = document.getElementById("figure-task");
  const timerElFigures = document.getElementById("timer-figures");
 const tasksFigures = [
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

  let unansweredTasks = [...tasksFigures]; 
  let incorrectAnswers = []; 
  let currentTask = null;
 
  startBtnFigures.addEventListener("click", startTestFigures);

  function startTestFigures() {
    unansweredTasksFigures = [...tasksFigures];
    incorrectAnswers = [];
    score = 0;
    startBtnFigures.style.display = "none";
    sendResultsBtnFigures.style.display = "none";
    document.getElementById("figure-task").style.display = "block";

    startTimer(90);
    generateTask();
  }

  function startTimerFigures(duration) {
    let timeLeft = duration;

    timerIntervalFigures = setInterval(() => {
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

  function checkAnswerFigures(selectedIndex) {
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
  function finishTestFigures() {
    clearInterval(timerInterval);
    resultElFigures.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    figureTaskEl.innerHTML = "";
    sendResultsBtnFigures.style.display = "block";
  }//🏁finishTest

  
window.getEntryIDs = function (testType) {
    console.log("🔹 Визначаємо entry ID для тесту:", testType);

    const entryIDs = {
        "motivation": {
            formURL: "https://docs.google.com/forms/d/e/1FAIpQLSeco-wWwULNG0-L1Qwnxn4tYBtQxinBXjVg4jTB1C2HzZ2KNw/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
        },
        "figures": {
            formURL: "https://docs.google.com/forms/d/e/1FAIpQLSfSJTHeQHKjxr-_Nfwr0qC1-5Rinq1xGevQ4i8yFKegE9Wfyw/formResponse",
            name: "entry.511676966",
            score: "entry.1332224844",
            level: "entry.1008291282"
        },
        "raven": {
            formURL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyylO6_4cpbzuD6THcT95VMAW5R7Foy1qykWDloI7Rew2b1g/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
        }
    };

    return entryIDs[testType] || null;
};
function submitTestResults(testType) {
    console.log(`✅ Виклик submitResults для ${testType}`);

    
    let sendStudentName = askStudentName();
    if (!sendStudentName) {
        console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
        return;
    }
    console.log("✅ Ім'я студента:", sendStudentName);

    if (testType === "figures") {
        let finalScore = calculateScoreFigures();
        let level = calculateLevelFigures(finalScore);
    } else if (testType === "raven") {
        let finalScore = calculateScoreRaven();
        let level = calculateLevelRaven(finalScore);
    } else  if (testType === "motivation") {
        let finalScore = calculateScoreMotivation();
        let level = getLevel(finalScore);



// else if (currentPage.includes("cognitive_skills/")) {
                        
// console.log("✅ Натискання кнопки: Перевіряємо відповіді...");
                    // ✅ Якщо не відповіли на всі запитання - зупиняємо процес
    /* if (totalQuestions.size !== answeredQuestions.size) {
        alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
        return;
    } */let checkResults = checkAllAnsweredMotivation();
 let totalQuestions, answeredQuestions;
if (checkResults.answeredQuestions.size == 10) {
    console.log("🔹 Загальна кількість питань:", checkResults.totalQuestions.size);
    console.log("🔹 Відповіді:", checkResults.answeredQuestions.size);        // Виконуємо перевірку заповнених відповідей
 // ✅ Запитуємо ім'я перед підрахунком балів
let sendStudentName = askStudentName();
if (!sendStudentName) {
    console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
    return;
}


 if (!checkResults || !checkResults.totalQuestions || !checkResults.answeredQuestions) {
        console.error("❌ Помилка: `checkResults` повернув `undefined` або `null`.");return;
    }
    // Деструктуризація після перевірки({ totalQuestions, answeredQuestions } = checkResults);
    const { totalQuestions, answeredQuestions, score } = checkAllAnsweredMotivation();
if (typeof checkAllAnsweredMotivation === "function") {
                    checkResults = checkAllAnsweredMotivation();
                } else {
                    console.error("❌ Функція checkAllAnsweredMotivation не знайдена!");
                    return;
                }
             console.log("✅ Обчислений бал:", finalScore);
             console.log("✅ Визначений рівень:", level);
                // Викликаємо submitResults з правильними значеннями
              if (!sendStudentName) {
    console.error("❌ sendStudentName не визначено!");
    return;
}
console.log("✅ sendStudentName існує:", sendStudentName);
     console.log("🚀 Готуємось викликати submitResults...");
console.log("📝 Данні перед відправкою:", {
    finalScore,
    level,
    studentName: sendStudentName
});
   if (typeof finalScore === "undefined" || typeof level === "undefined") {
    console.error("❌ finalScore або level не визначено!");
    return;
}

 submitResults(finalScore, level, getEntryIDs(), sendStudentName);
                }// if checkResults.answeredQuestions.size == 10
                else  if (checkResults.answeredQuestions.size < 10){
                    alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
                    return;
                }        
    } // cognitive_skills
else {
        console.error("❌ Невідома сторінка! Результати не відправлено.");
        return;
    }












     }    
    // else{
    //     console.error("❌ Невідомий тест! Результати не відправлено.");
    //     return;
    // }

    // console.log("🔹 Обчислений бал:", finalScore);
    // console.log("🔹 Визначений рівень:", level);

    // Отримуємо правильні entryIDs
    let entryIDs = getEntryIDs(testType);
    if (!entryIDs) {
        console.error("❌ Не вдалося знайти entry ID для тесту:", testType);
        return;
    }

    // Викликаємо `submitResults()`
    submitResults(finalScore, level, entryIDs, sendStudentName);
// } `submitResults()`
       // ✅ Переписуємо submitResults() та його виклик
 window.submitResults = function(finalScore, level, entryIDs, sendStudentName) {
    console.log("📨 submitResults() запущено!");

    if (!entryIDs || !entryIDs.formURL) {
        console.error("❌ Не вдалося знайти entry ID для цієї сторінки.");
        alert("❌ Помилка! Не вдалося знайти entry ID.");
        return;
    }

    console.log("🔹 Отримані entry IDs:", entryIDs);

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
    });
};
        




    console.log("🔹 Остання спроба:", lastAttemptDate);
    console.log("✅ Обробник події додано до `send-results-btn`.");
    










// window.submitResults = function(finalScore, level, entryIDs, sendStudentName) {console.log("📨 submitResults() запущено!");

//     if (window.isSubmitting) return;
//     window.isSubmitting = true;

//     console.log("✅ Функція submitResults викликана!");
    
//     if (!entryIDs || !entryIDs.formURL) {
//         console.error("❌ Не вдалося знайти entry ID для цієї сторінки.");
//         alert("❌ Помилка! Не вдалося знайти entry ID.");
//         window.isSubmitting = false;
//         return;
//     }

//     console.log("🔹 Отримані entry IDs:", entryIDs);

//     const formData = new URLSearchParams();
//     formData.append(entryIDs.name, sendStudentName);
//     formData.append(entryIDs.score, Number(finalScore));
//     formData.append(entryIDs.level, String(level));
// console.log("🔹 Надсилаємо:", Object.fromEntries(formData));
//     console.log("📩 Формат перед відправкою:", formData.toString());

// fetch(entryIDs.formURL, {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: formData
// })
// .then(response => response.text()) // ✅ Отримати відповідь Google Forms
// .then(text => console.log("🔹 Відповідь Google Forms:", text)) // 🔎 Друкуємо відповідь
// .catch(error => console.error("❌ Помилка надсилання:", error));

//     fetch(entryIDs.formURL, {
//         method: "POST",
//         mode: "no-cors", // Запобігає CORS-блокуванню
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: formData
//     })
//     .then(() => {
//         console.log("✅ Успішно надіслано!");
//         alert("✅ Дані успішно надіслані у Google Forms!");
//         document.getElementById("send-results-btn").style.display = "none";
//     })
//     .catch(error => {
//         console.error("❌ Помилка надсилання:", error);
//         alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
//     })
//     .finally(() => {
//         window.isSubmitting = false;
//     });
// };//✅ Виклик submitResults
// 🏫🧒📛 Функція для запиту імені студента
window.askStudentName = function () {
    let studentName = prompt("Введіть ваше ім'я:").trim();

    if (!studentName || studentName.length < 2) {
        alert("❗ Будь ласка, введіть коректне ім'я.");
        return null;  // ❌ Якщо ім'я некоректне, повертаємо null
    }

    // ✅ Фільтр символів у імені
    let cleanedStudentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ0-9' ]/g, "");

    return cleanedStudentName;  // ✅ Повертаємо очищене ім'я
};// 🏫🧒📛 Функція для запиту імені студента

// sendResultsBtn.addEventListener("click", () => {
//     console.log("Виклик submitResults");
//     const currentPage = window.location.pathname;
//    let finalScore;
// let level;  // 🔹 Тепер `level` доступний глобально у функції!
// let sendStudentName; // 🔹 Щоб не оголошувати всередині `if`
//     window.calculateLevel = function(score) {
//     if (score === 10) return "Дуже високий";
//     if (score >= 8) return "Високий";
//     if (score >= 4) return "Середній";
//     if (score >= 2) return "Низький";
//     return "Дуже низький";
// };

    // 🕸📄 Визначаємо, який тест запущено
//     if (currentPage.includes("matrytsya_ravena.html")) {


//          // ✅ Запитуємо ім'я перед підрахунком балів
//   let sendStudentName = askStudentName();
// if (!sendStudentName) {
//     console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
//     return;
// }
// console.log("✅ Ім'я студента:", sendStudentName);
//  console.log("🔍 Перевірка calculateLevel:", typeof calculateLevel);
// // let finalScore = calculateLevelRaven(score);
// //         let level = calculateLevelRaven(finalScore);
//         finalScore = calculateLevelRaven ();// функція calculateLevelRaven сама обчислює score всередині себе
//         level = calculateLevel(finalScore);
// if (typeof finalScore === "undefined" || typeof level === "undefined") {
//     console.error("❌ finalScore або level не визначено!");
//     return;
// }    
//     submitResults(finalScore, level, getEntryIDs(), sendStudentName);// ✅ Відправка результатів
// console.log("🔹 Перед відправкою:", {
//     studentName: sendStudentName,
//     score: score, // Перевіряємо, чи тут є число
//     level: level, // Переконуємося, що є рівень
// });//console.log
//     } 
// else if (currentPage.includes("upiznay_fihury.html")) {
//  // ✅ Запитуємо ім'я перед підрахунком балів
//  let sendStudentName = askStudentName();
// if (!sendStudentName) {
//     console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
//     return;
// }console.log(window.finalScore);
// console.log("✅ Ім'я студента:", sendStudentName);
// // console.log("🔍 Перевірка calculateLevelFigures:", typeof window.calculateLevelFigures);
// // if (typeof window.calculateLevelFigures === "function") {
// //     let level = window.calculateLevelFigures(finalScore);
// // } else {
// //     console.error("❌ Функція calculateLevelFigures не знайдена!");
// // }
//         let finalScore = calculateScoreFigures();


// if (typeof finalScore === "undefined") {
//     console.error("❌ finalScore не визначено!");
//     return;
// }

//         let level = calculateLevel(finalScore);
//     console.log("✅ Підрахований рівень:", level);
// if (typeof finalScore === "undefined" || typeof level === "undefined") {
//     console.error("❌ finalScore або level не визначено!");
//     return;
// }
//     // ✅ Відправка результатів
//     submitResults(finalScore, level, getEntryIDs(), sendStudentName);
// console.log("🔹 Перед відправкою:", {
//     studentName: sendStudentName,
//     score: score, // Перевіряємо, чи тут є число
//     level: level, // Переконуємося, що є рівень
// });//console.log
//     } // upiznay_fihury
// else if (currentPage.includes("cognitive_skills/")) {
                        
// console.log("✅ Натискання кнопки: Перевіряємо відповіді...");
//                     // ✅ Якщо не відповіли на всі запитання - зупиняємо процес
//     /* if (totalQuestions.size !== answeredQuestions.size) {
//         alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
//         return;
//     } */let checkResults = checkAllAnsweredMotivation();
//  let totalQuestions, answeredQuestions;
// if (checkResults.answeredQuestions.size == 10) {
//     console.log("🔹 Загальна кількість питань:", checkResults.totalQuestions.size);
//     console.log("🔹 Відповіді:", checkResults.answeredQuestions.size);        // Виконуємо перевірку заповнених відповідей
//  // ✅ Запитуємо ім'я перед підрахунком балів
// let sendStudentName = askStudentName();
// if (!sendStudentName) {
//     console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
//     return;
// }
//                     let finalScore = calculateScoreMotivation();
//                let  level = getLevel(finalScore);

//  if (!checkResults || !checkResults.totalQuestions || !checkResults.answeredQuestions) {
//         console.error("❌ Помилка: `checkResults` повернув `undefined` або `null`.");return;
//     }
//     // Деструктуризація після перевірки({ totalQuestions, answeredQuestions } = checkResults);
//     const { totalQuestions, answeredQuestions, score } = checkAllAnsweredMotivation();


//         // const finalScore = window.calculateScore();console.log("🔍 Перевірка calculateScore:", typeof calculateScore);✅ Тільки тепер підраховуємо бали

// console.log("🔹 Обчислений бал:", finalScore); // Додано для перевірки
//          // ✅ Перевірка тесту та заповнених питань після натискання кнопки
// console.log("✅ Ім'я студента:", sendStudentName);
// console.log("✅ ПЕРЕВІРКА: level =", level);
//     // if (currentPage.includes("cognitive_skills/")) {} 
//     // ❗ Запобігаємо помилці, якщо функція повернула null або undefined
//    console.log("🔹 Перевірка totalQuestions та answeredQuestions", totalQuestions, answeredQuestions);
// console.log("✅ Код доходить сюди! Продовжуємо...");

//                 console.log("✅ Надсилаємо:", { name: sendStudentName, score: finalScore, level });

        
//                 if (typeof checkAllAnsweredMotivation === "function") {
//                     checkResults = checkAllAnsweredMotivation();
//                 } else {
//                     console.error("❌ Функція checkAllAnsweredMotivation не знайдена!");
//                     return;
//                 }
//              console.log("✅ Обчислений бал:", finalScore);
//              console.log("✅ Визначений рівень:", level);
//                 // Викликаємо submitResults з правильними значеннями
//               if (!sendStudentName) {
//     console.error("❌ sendStudentName не визначено!");
//     return;
// }
// console.log("✅ sendStudentName існує:", sendStudentName);
//      console.log("🚀 Готуємось викликати submitResults...");
// console.log("📝 Данні перед відправкою:", {
//     finalScore,
//     level,
//     studentName: sendStudentName
// });
//    if (typeof finalScore === "undefined" || typeof level === "undefined") {
//     console.error("❌ finalScore або level не визначено!");
//     return;
// }

//  submitResults(finalScore, level, getEntryIDs(), sendStudentName);
//                 }// if checkResults.answeredQuestions.size == 10
//                 else  if (checkResults.answeredQuestions.size < 10){
//                     alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
//                     return;
//                 }        
//     } // cognitive_skills
// else {
//         console.error("❌ Невідома сторінка! Результати не відправлено.");
//         return;
//     }
// const level = getLevel(score);
    // console.log("🔹 Надсилаємо:", { score, level });
// console.log("✅ ПЕРЕВІРКА: level =", level);
// if (typeof finalScore === "undefined" || typeof level === "undefined") {
    // console.error("❌ finalScore або level не визначено!");
    // return;
// }

// });//sendResultsBtn click                

   // ✅ Функції обмеження повторного проходження тесту (не виконується при завантаженні)

// ✅ Функція перевірки обмежень для конкретного тесту
// function checkTestRetry(testType, resultElement) {
//     const lastAttemptKey = `lastAttempt${testType}`;
//     const lastAttempt = localStorage.getItem(lastAttemptKey);
//     const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;

//     if (lastAttemptDate && !isAllowedToRetry(lastAttemptDate)) {
	

//         resultElement.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(lastAttemptDate)} днів.`;
//         return false;
//     }

//     resultElement.innerHTML = "✅ Ви можете пройти тест!";
//     return true;
// }

// ✅ Додаємо обробники подій на заголовки тестів
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("figures-title").addEventListener("click", () => {
//         checkTestRetry("Figures", document.getElementById("resultElFigures"));
//     });

//     document.getElementById("raven-title").addEventListener("click", () => {
//         checkTestRetry("Raven", document.getElementById("resultElRaven"));
//     });

//     document.getElementById("motivation-title").addEventListener("click", () => {
//         checkTestRetry("Motivation", document.getElementById("resultElMotivation"));
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

});
