document.addEventListener("DOMContentLoaded", () => {
    window.sendResultsBtn = document.getElementById("send-results-btn");
    window.resultEl = document.getElementById("result");
    const lastAttemptKey = getLastAttemptKey(); // ✅ Отримуємо ключ для LocalStorage
    const lastAttempt = localStorage.getItem(lastAttemptKey); // ✅ Оголошуємо lastAttempt
    const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;


   





    window.getEntryIDs = function() {
        const currentPage = window.location.pathname;
        console.log("🔹 Визначаємо entry ID для сторінки:", currentPage);
      
        if (currentPage.includes("upiznay_fihury.html")) {
          return {
            formURL: "https://docs.google.com/forms/d/e/1FAIpQLSfSJTHeQHKjxr-_Nfwr0qC1-5Rinq1xGevQ4i8yFKegE9Wfyw/formResponse",
            name: "entry.511676966",
            score: "entry.1332224844",
            level: "entry.1008291282"
          };
        }
      
        if (currentPage.includes("matrytsya_ravena.html")) {
          return {
            formURL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyylO6_4cpbzuD6THcT95VMAW5R7Foy1qykWDloI7Rew2b1g/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
          };
        }
      
        if (currentPage.includes("cognitive_skills/")) {
          return {
            formURL: "https://docs.google.com/forms/d/e/1FAIpQLSeco-wWwULNG0-L1Qwnxn4tYBtQxinBXjVg4jTB1C2HzZ2KNw/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
          };
        }
      
        return null;
      };
       
         




    console.log("🔹 Остання спроба:", lastAttemptDate);
    console.log("✅ Обробник події додано до `send-results-btn`.");
    










window.submitResults = function(finalScore, level, entryIDs, cleanedStudentName) {console.log("📨 submitResults() запущено!");

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
    formData.append(entryIDs.name, cleanedStudentName);
    formData.append(entryIDs.score, Number(finalScore));
    formData.append(entryIDs.level, String(level));
console.log("🔹 Надсилаємо:", Object.fromEntries(formData));
    console.log("📩 Формат перед відправкою:", formData.toString());

// fetch(entryIDs.formURL, {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: formData
// })
// .then(response => response.text()) // ✅ Отримати відповідь Google Forms
// .then(text => console.log("🔹 Відповідь Google Forms:", text)) // 🔎 Друкуємо відповідь
// .catch(error => console.error("❌ Помилка надсилання:", error));

    fetch(entryIDs.formURL, {
        method: "POST",
        mode: "no-cors", // Запобігає CORS-блокуванню
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
    })
    .then(() => {
        console.log("✅ Успішно надіслано!");
        alert("✅ Дані успішно надіслані у Google Forms!");
        document.getElementById("send-results-btn").style.display = "none";
    })
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
};//✅ Виклик submitResults
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

sendResultsBtn.addEventListener("click", () => {
    console.log("Виклик submitResults");
    const currentPage = window.location.pathname;
    let finalScore;
    

    // 🕸📄 Визначаємо, який тест запущено
    if (currentPage.includes("matrytsya_ravena.html")) {


         // ✅ Запитуємо ім'я перед підрахунком балів
  let sendStudentName = askStudentName();
if (!sendStudentName) {
    console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
    return;
}
console.log("✅ Ім'я студента:", sendStudentName);
 finalScore = calculateScore();
        const level = calculateLevelRaven(finalScore);
    } 
else if (currentPage.includes("upiznay_fihury.html")) {
 // ✅ Запитуємо ім'я перед підрахунком балів
 let sendStudentName = askStudentName();
if (!sendStudentName) {
    console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
    return;
}
console.log("✅ Ім'я студента:", sendStudentName);

        finalScore = window.finalScoreFigures;
        const level = window.finalLevelFigures;
    } 
else if (currentPage.includes("cognitive_skills/")) {
                        const checkResults = checkAllAnsweredMotivation();
console.log("✅ Натискання кнопки: Перевіряємо відповіді...");
                    // ✅ Якщо не відповіли на всі запитання - зупиняємо процес
    /* if (totalQuestions.size !== answeredQuestions.size) {
        alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
        return;
    } */
 let totalQuestions, answeredQuestions;
if (checkResults.totalQuestions.size === checkResults.answeredQuestions.size) {
    console.log("🔹 Загальна кількість питань:", checkResults.totalQuestions.size);
    console.log("🔹 Відповіді:", checkResults.answeredQuestions.size);        // Виконуємо перевірку заповнених відповідей
 // ✅ Запитуємо ім'я перед підрахунком балів
let sendStudentName = askStudentName();
if (!sendStudentName) {
    console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
    return;
}
console.log("✅ Ім'я студента:", sendStudentName);

        // ✅ Тільки тепер підраховуємо бали
                const finalScore = getLevel();console.log("🔹 Обчислений бал:", finalScore); // Додано для перевірки

                const level = getLevel(finalScore);
         // ✅ Перевірка тесту та заповнених питань після натискання кнопки

    // if (currentPage.includes("cognitive_skills/")) {} 
    // ❗ Запобігаємо помилці, якщо функція повернула null або undefined
    if (!checkResults || !checkResults.totalQuestions || !checkResults.answeredQuestions) {
        console.error("❌ Помилка: `checkResults` повернув `undefined` або `null`.");return;
    }
    // Деструктуризація після перевірки({ totalQuestions, answeredQuestions } = checkResults);
    const { totalQuestions, answeredQuestions, score } = checkAllAnsweredMotivation();
console.log("🔹 Перевірка totalQuestions та answeredQuestions", totalQuestions, answeredQuestions);
console.log("✅ Код доходить сюди! Продовжуємо...");

                console.log("✅ Надсилаємо:", { score: finalScore, level });

        
                if (typeof checkAllAnsweredMotivation === "function") {
                    checkResults = checkAllAnsweredMotivation();
                } else {
                    console.error("❌ Функція checkAllAnsweredMotivation не знайдена!");
                    return;
                }
             console.log("✅ Обчислений бал:", finalScore);
             console.log("✅ Визначений рівень:", level);
                // Викликаємо submitResults з правильними значеннями
              if (!cleanedStudentName) {
    console.error("❌ cleanedStudentName не визначено!");
    return;
}
console.log("✅ cleanedStudentName існує:", cleanedStudentName);
     console.log("🚀 Готуємось викликати submitResults...");
console.log("📝 Данні перед відправкою:", {
    finalScore,
    level,
    studentName: cleanedStudentName
});
   if (typeof finalScore === "undefined" || typeof level === "undefined") {
    console.error("❌ finalScore або level не визначено!");
    return;
}

 submitResults(finalScore, level, getEntryIDs());
                }
                else  {
                    alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
                    return;
                }        
    } else {
        console.error("❌ Невідома сторінка! Результати не відправлено.");
        return;
    }
// const level = getLevel(score);

    console.log("🔹 Надсилаємо:", { score, level });

    // ✅ Відправка результатів
    submitResults(finalScore, level, getEntryIDs(), cleanedStudentName);
console.log("🔹 Перед відправкою:", {
    studentName: cleanedStudentName,
    score: score, // Перевіряємо, чи тут є число
    level: level, // Переконуємося, що є рівень
});//console.log
});//sendResultsBtn click                









   // ✅ Функції обмеження повторного проходження тесту (не виконується при завантаженні)
   function getLastAttemptKey() {
    const currentPage = window.location.pathname;
    if (currentPage.includes("cognitive_skills/")) return "lastAttemptMotivation";
    if (currentPage.includes("matrytsya_ravena.html")) return "lastAttemptRaven";
    if (currentPage.includes("upiznay_fihury.html")) return "lastAttemptFigures";
    return "lastAttemptDefault";
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








    if (lastAttempt && !isAllowedToRetry(new Date(lastAttempt))) {
        resultEl.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(new Date(lastAttempt))} днів.`;
        sendResultsBtn.disabled = true;
        return;
    }

});
