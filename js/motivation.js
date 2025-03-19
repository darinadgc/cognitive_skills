document.addEventListener("DOMContentLoaded", () => {
  const sendResultsBtn = document.getElementById("send-results-btn");

  sendResultsBtn.addEventListener("click", () => {
    const questions = document.querySelectorAll('input[type="radio"]');
    const totalQuestions = new Set();
    let answeredQuestions = new Set();

    questions.forEach((input) => {
      totalQuestions.add(input.name); 
      if (input.checked) {
        answeredQuestions.add(input.name);
      }
    });

    // ✅ Перевірка на всі відповіді
    if (totalQuestions.size !== answeredQuestions.size) {
      alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
      return; 
    }

    const finalScore = calculateScore(); // ✅ Підтягуємо score з script.js
    const level = getLevel(finalScore);

    const studentName = prompt("Введіть ваше ім'я:");
    if (!studentName || studentName.trim() === "") {
      alert("❗ Будь ласка, введіть ім'я.");
      return;
    }

    submitResults(finalScore, level, getEntryIDs(), studentName);
  });

  function getLevel(score) {
    if (score <= 6) return "Низький";
    if (score > 6 && score <= 13) return "Середній";
    return "Високий";
  }

});
