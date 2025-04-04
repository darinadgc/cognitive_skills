// Визначення функції getLastAttemptKey
function getLastAttemptKey() {
    return "lastAttemptMotivation";
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
    const main = document.querySelector("main");
    window.resultElMotivation = document.getElementById("result-motivation");
    window.sendResultsBtnMotivation = document.getElementById("send-results-motivation-btn");

    // Виклик функції перевірки обмежень
    if (!checkTestRetry(main)) {
        console.log("❌ Ви вже проходили тест. Повідомлення відображено.");
        return; // Зупиняємо подальше виконання, якщо тест вже був пройдений
    }



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

  

    
 //  🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔🆔
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

//💗💗💗💗💗💗💗💗
    const questions = document.querySelectorAll('input[type="radio"][name^="mot-que"]'); // Вибираємо всі питання мотивації
    const totalQuestions = new Set();
    const answeredQuestions = new Set();
//	✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
window.checkAllAnsweredMotivation = function() {
totalQuestions.clear(); // Очищаємо перед підрахунком
    answeredQuestions.clear();
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

   // console.log("🔹 Загальна кількість питань:", totalQuestions);
   // console.log("Відповіді ", checkResults.answeredQuestions);

  //  console.log("🔹 Обчислений бал:", score);

    return { totalQuestions: totalQuestions.size, answeredQuestions: answeredQuestions.size, score }; // ✅ Повертаємо об'єкт
};//checkAllAnsweredMotivation ✅✅✅✅✅✅✅✅.size.size.size

//🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮
window.calculateScoreMotivation = function() {
    let checkedAnswers = document.querySelectorAll('input[type="radio"]:checked'); // ✅ Отримуємо відповіді
   score = 0; // const Загальний бал

        checkedAnswers.forEach((input) => {
        score += parseInt(input.value) || 0; // ✅ Додаємо бали
    });
        console.log("🔹 Загальна кількість питань:", totalQuestions.size);
    console.log("🔹 Відповіді:", answeredQuestions.size);
    console.log("🔹 Обчислений бал:", score); // ✅ Переносимо до return
//❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗❗
    return score;
}//calculateScoreMotivation🧮🧮🧮🧮🧮🧮
window.getLevelMotivation = function(score) {
    if (score > 13) return "Високий";
    if (score > 7) return "Середній";
    return "Низький";
};
//    return selectedEntryIDs;
//❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕❕
    sendResultsBtnMotivation.addEventListener("click", () => {
        let checkResults = checkAllAnsweredMotivation();
        console.log("Відповіді ", checkResults.answeredQuestions);
        console.log("🔍 Перевірка checkResults:", checkResults);
        console.log("🔍 answeredQuestions:", checkResults.answeredQuestions);
        console.log("🔍 totalQuestions:", checkResults.totalQuestions);

        if (checkResults.answeredQuestions === checkResults.totalQuestions) {
            console.log("🚀 Виклик submitResults()");
            submitResults(checkResults.score); // ✅ Викликаємо submitResults
        } else {
            alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
            console.log("Відповіді ", answeredQuestions);
            return;
        }
    });
});// DOMContentLoaded
	//✅submitResults
// 	📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧📧
// Функція для збереження результатів та дати останньої спроби
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
    }
    console.log("✅ Ім'я студента:", sendStudentName);

    console.log("🔍 Викликаємо calculateScoreMotivation...");
    finalScore = calculateScoreMotivation();
    console.log("✅ finalScore після розрахунку:", finalScore);

    level = getLevelMotivation(finalScore);
    console.log("✅ Визначений рівень:", level);

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
        sendResultsBtnMotivation.style.display = "none";
        resultElMotivation.innerHTML = `<strong>Дякуємо за відповіді!</strong>`;

        // Зберігаємо дату останньої спроби в localStorage
        localStorage.setItem(getLastAttemptKey(), new Date().toISOString());
    })
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
};

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


