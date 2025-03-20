document.addEventListener("DOMContentLoaded", () => {
  const sendResultsBtn = document.getElementById("send-results-btn");
  window.resultEl = document.getElementById("result");

  console.log("✅ Обробник події додано до `send-results-btn`.");
  console.log("✅ Виклик submitResults");

  sendResultsBtn.addEventListener("click", () => {  
        const currentPage = window.location.pathname;
        let totalQuestions, answeredQuestions;

        if (currentPage.includes("cognitive_skills/")) {
            // ✅ Перевірка для тесту "Мотивація"
            if (typeof checkAllAnsweredMotivation === "function") {
                ({ totalQuestions, answeredQuestions } = checkAllAnsweredMotivation());
            } else {
                console.error("❌ Функція checkAllAnsweredMotivation не знайдена!");
                return;
            }
        } else {
            // ✅ Перевірка для інших тестів (фігури, матриця Равена)
            ({ totalQuestions, answeredQuestions } = checkAllAnsweredGeneral());
        }

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
    });


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

    
 

  function getLastAttemptKey() {
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
  // ✅ Перевіряємо, чи можна пройти тест через 3-4 тижні
  // if (lastAttempt && !isAllowedToRetry(new Date(lastAttempt))) {
  //   resultEl.innerHTML = ❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(new Date(lastAttempt))} днів.;
  //   sendResultsBtn.disabled = true;
  //   return;
  // }
  function getLastAttemptKey() {
    const currentPage = window.location.pathname;
    if (currentPage.includes("cognitive_skills/")) return "lastAttemptMotivation";
    if (currentPage.includes("matrytsya_ravena.html")) return "lastAttemptRaven";
    if (currentPage.includes("upiznay_fihury.html")) return "lastAttemptFigures";
    return "lastAttemptDefault"; // Fallback to prevent undefined
    // return null; Запобігає помилці
  }
});
