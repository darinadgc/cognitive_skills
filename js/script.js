document.addEventListener("DOMContentLoaded", () => {
  const sendResultsBtn = document.getElementById("send-results-btn");
  window.resultEl = document.getElementById("result");

  console.log("✅ Обробник події додано до `send-results-btn`.");
  console.log("✅ Виклик submitResults");

  // ✅ Функція для перевірки заповнених питань
  function checkAllAnswered() {
      const questions = document.querySelectorAll('input[type="radio"]');
      const totalQuestions = new Set();
      let answeredQuestions = new Set();

      questions.forEach((input) => totalQuestions.add(input.name));
      questions.forEach((input) => {
          if (input.checked) answeredQuestions.add(input.name);
      });

      return { totalQuestions, answeredQuestions };
  }

  sendResultsBtn.addEventListener("click", () => {
      const { totalQuestions, answeredQuestions } = checkAllAnswered();

      // ✅ Перевіряємо, чи відповіли на всі запитання
      if (totalQuestions.size !== answeredQuestions.size) {
          alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
          return;
      }

      // ✅ Запит імені після перевірки заповнених відповідей
      const studentName = prompt("Введіть ваше ім'я:").trim();
      if (!studentName || studentName.length < 2) {
          alert("❗ Будь ласка, введіть коректне ім'я.");
          return;
      }

      // ✅ Фільтр символів у імені
      const cleanedStudentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ0-9' ]/g, "");

      // 🕸📄 Визначаємо, який тест запущено
      const currentPage = window.location.pathname;
      let finalScore, level;

      if (currentPage.includes("matrytsya_ravena.html")) {
          finalScore = calculateScore();
          level = calculateLevelRaven(finalScore);
      } else if (currentPage.includes("upiznay_fihury.html")) {
          finalScore = window.finalScoreFigures;
          level = window.finalLevelFigures;
      } else if (currentPage.includes("cognitive_skills/")) {
          finalScore = calculateScore();
          level = getLevel(finalScore);
      } else {
          console.error("❌ Невідома сторінка! Результати не відправлено.");
          return;
      }

      console.log("🔹 Надсилаємо:", { name: cleanedStudentName, score: finalScore, level });

      // ✅ Відправка результатів
      submitResults(finalScore, level, getEntryIDs(), cleanedStudentName);
  });

  function getLastAttemptKey() {
      const currentPage = window.location.pathname;
      if (currentPage.includes("cognitive_skills/")) return "lastAttemptMotivation";
      if (currentPage.includes("matrytsya_ravena.html")) return "lastAttemptRaven";
      if (currentPage.includes("upiznay_fihury.html")) return "lastAttemptFigures";
      return "lastAttemptDefault";
  }
});
