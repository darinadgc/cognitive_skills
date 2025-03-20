document.addEventListener("DOMContentLoaded", () => {
    const sendResultsBtn = document.getElementById("send-results-btn");
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
    
    // ✅ Функція перевірки заповнених питань для Фігур та Матриці Равена
    function checkAllAnsweredGeneral() {
        const questions = document.querySelectorAll('input[type="radio"]');
        const totalQuestions = new Set();
        let answeredQuestions = new Set();

        questions.forEach((input) => totalQuestions.add(input.name));
        questions.forEach((input) => {
            if (input.checked) answeredQuestions.add(input.name);
        });

        return { totalQuestions, answeredQuestions };
    }









window.submitResults = function(finalScore, level, entryIDs, studentName) {
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
    formData.append(entryIDs.name, studentName);
    formData.append(entryIDs.score, Number(finalScore));
    formData.append(entryIDs.level, String(level));

    console.log("🔹 Надсилаємо:", Object.fromEntries(formData));

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
};//submitResults
sendResultsBtn.addEventListener("click", () => {
    console.log("✅ Виклик submitResults");

    const currentPage = window.location.pathname;
    let totalQuestions, answeredQuestions;

    // ✅ Перевірка тесту та заповнених питань після натискання кнопки
    let checkResults;
    if (currentPage.includes("cognitive_skills/")) {
        if (typeof checkAllAnsweredMotivation === "function") {
            checkResults = checkAllAnsweredMotivation();
        } else {
            console.error("❌ Функція checkAllAnsweredMotivation не знайдена!");
            return;
        }
    } else {
        checkResults = checkAllAnsweredGeneral();
    }

    // ❗ Запобігаємо помилці, якщо функція повернула null або undefined
    if (!checkResults || !checkResults.totalQuestions || !checkResults.answeredQuestions) {
        console.error("❌ Помилка: `checkResults` повернув `undefined` або `null`.");return;
    }

    // Деструктуризація після перевірки
    ({ totalQuestions, answeredQuestions } = checkResults);

    // ✅ Якщо не відповіли на всі запитання - зупиняємо процес
    if (totalQuestions.size !== answeredQuestions.size) {
        alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
        return;
    }

    // 🏫🧒📛 Після перевірки запитуємо ім'я  
    const studentName = prompt("Введіть ваше ім'я:").trim();
    if (!studentName || studentName.length < 2) {
        alert("❗ Будь ласка, введіть коректне ім'я.");
        return;
    }

    // ✅ Фільтр символів у імені
    const cleanedStudentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ0-9' ]/g, "");

    // 🕸📄 Визначаємо, який тест запущено
    let finalScore, level;

    if (currentPage.includes("matrytsya_ravena.html")) {
        finalScore = calculateScore();
        level = calculateLevelRaven(finalScore);
    } else if (currentPage.includes("upiznay_fihury.html")) {
        finalScore = window.finalScoreFigures;
        level = window.finalLevelFigures;
    } else if (currentPage.includes("cognitive_skills/")) {
        finalScore = calculateScoreMotivation();
        level = getLevel(finalScore);
    } else {
        console.error("❌ Невідома сторінка! Результати не відправлено.");
        return;
    }

    console.log("🔹 Надсилаємо:", { name: cleanedStudentName, score: finalScore, level });

    // ✅ Відправка результатів
    submitResults(finalScore, level, getEntryIDs(), cleanedStudentName);
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
