document.addEventListener("DOMContentLoaded", () => {
    window.resultElMotivation = document.getElementById("result-motivation");
    // const lastAttemptKey = getLastAttemptKey(); // ✅ Отримуємо ключ для LocalStorage
    // const lastAttempt = localStorage.getItem(lastAttemptKey); // ✅ Оголошуємо lastAttempt
    // const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;

const sendResultsBtnMotivation = document.getElementById("send-results-motivation-btn");

  let score;


  // let sendStudentName; 🔹 Щоб не оголошувати всередині `if`



// function allQuestionsAnswered(Motivation) {
//     console.log(`🔍 Перевіряємо, чи всі питання заповнені для тесту: ${Motivation}`);
//     // Отримуємо всі питання для даного тесту
//     const questions = document.querySelectorAll(`.question-${Motivation}`);  
// if (questions.length === 0) {
//         console.warn(`⚠️ Помилка: не знайдено жодного питання для тесту "${Motivation}". Переконайтеся, що класи ".question-${Motivation}" існують.`);
//         return false;
//     }
  
//     for (let question of questions) {
//         // Шукаємо вибраний варіант у кожному питанні
//         const selectedAnswer = question.querySelector("input[type='radio']:checked");
//         if (!selectedAnswer) {
//             console.warn(`⚠️ Не відповіли на питання:`, question);
//             return false; // Якщо хоч одне питання не заповнене – повертаємо false
//         }
//     }
//     console.log(`✅ Усі питання для тесту "${Motivation}" заповнені.`);
//     return true; // Всі питання мають відповіді
// }

// sendResultsBtns.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//         const testType = event.target.dataset.testType; // ✅ Отримуємо testType з кнопки
//         console.log("📌 Натиснута кнопка для тесту:", testType);
//         submitTestResults(testType); // Передаємо testType у функцію
//     });
// });
        // submitResults(normalizedTestType);




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
            formURL: "https://docs.google.com/forms/d/e/1FAIpQLSeco-wWwULNG0-L1Qwnxn4tYBtQxinBXjVg4jTB1C2HzZ2KNw/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
        }
   
 // return entryIDs[testType] || null;
      //   if (!entryIDs[testType]) {
      //   console.error(`❌ entryIDs не знайдено для тесту: ${testType}`);
      //   return null;
      // }
        return null;
  };//getEntryIDs

    console.log("✅ Успішно додані обробники подій!");
	//✅✅✅✅✅✅✅✅✅✅✅submitResults
// ✅ Головна функція для надсилання результатів у Google Forms
window.submitResults = function(finalScore, level, entryIDs, sendStudentName) {
    console.log("📨 submitResults() запущено!");

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
        resultEl.innerHTML = `<strong>Дякуємо за відповіді!</strong>`;
})
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
};// ✅ Головна функція для надсилання результатів у Google Forms

//💗💗💗💗💗💗💗💗
    const questions = document.querySelectorAll('input[type="radio"][name^="mot-que"]'); // Вибираємо всі питання мотивації
    const totalQuestions = new Set();
    const answeredQuestions = new Set();
window.checkAllAnsweredMotivation = function() {
    let score = 0; // Загальний бал
console.log("🟢 Всі знайдені питання:", questions);

    // ✅ Додаємо питання за `name`, щоб уникнути дублікатів
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

    return { totalQuestions: totalQuestions.size, answeredQuestions: answeredQuestions.size, score };
};//checkAllAnsweredMotivation

window.calculateScoreMotivation = function() {
    let checkedAnswers = document.querySelectorAll('input[type="radio"]:checked'); // ✅ Отримуємо відповіді
    let score = 0; // Загальний бал

        checkedAnswers.forEach((input) => {
        score += parseInt(input.value) || 0; // ✅ Додаємо бали
    });

    console.log("🔹 Обчислений бал:", score); // ✅ Переносимо до return
    return score;
}//calculateScoreMotivation
window.getLevelMotivation = function(score) {
    if (score > 13) return "Високий";
    if (score > 7) return "Середній";
    return "Низький";
};
//    return selectedEntryIDs;
//❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕




    
// ✅ 📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩📩Функція обробки тесту 
function submitResults() {
    let entryIDs = getEntryIDs();
    // let selectedEntryIDs = entryIDs ? entryIDs[testType] : null;
if (!entryIDs) {
        console.error(`❌ Не вдалося знайти entry ID для тесту`);
        return;
    }
    // if (!selectedEntryIDs) {
    //     console.error(`❌ Не вдалося знайти entry ID для тесту: ${testType}`);
    //     return;
    // }
console.log("✅ Визначені entry IDs:", entryIDs);
    let selectedEntryIDs = entryIDs; // ✅ Правильне призначення
	    let checkResults = checkAllAnsweredMotivation();
 
    let sendStudentName = askStudentName();
        console.log("✅ Ім'я студента:", sendStudentName);

    let finalScore = 0;
    let level = "";
    console.log("✅ Визначений рівень:", level);
if (!sendStudentName) {
        console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
        return;
    }
        finalScore = calculateScoreMotivation();
        level = getLevelMotivation(finalScore);
        console.log("✅ Ім'я студента:", sendStudentName);
    console.log("✅ Визначені entry IDs:", selectedEntryIDs);
    console.log("✅ Обчислений бал:", finalScore);
 
} // submitResults

  sendResultsBtnMotivation.addEventListener("click", () => {
    console.log(answeredQuestions.size, " відповідей");
//  let totalQuestions, answeredQuestions;
    if (checkResults.answeredQuestions.size === 10) {   
submitResults(); // ✅ Викликаємо submitResults
   }   

    console.log(answeredQuestions.size, " відповідей");
	   if (checkResults.answeredQuestions.size < 10) {
            alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
            return;
        }
  
  }); 

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

});
