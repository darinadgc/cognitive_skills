document.addEventListener("DOMContentLoaded", () => {
  const sendResultsBtn = document.getElementById("send-results-btn");

  sendResultsBtn.addEventListener("click", () => {
    const questions = document.querySelectorAll('input[type="radio"]');
    const totalQuestions = new Set();
    let answeredQuestions = new Set();
// ✅ Додаємо всі унікальні групи питань у `totalQuestions`
        questions.forEach((input) => totalQuestions.add(input.name));
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
function calculateScoreMotivation() {
const questions = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    questions.forEach((input) => {
        if (input.value === "високий рівень") score += 2;
        else if (input.value === "середній рівень") score += 1;
        else if (input.value === "низький рівень") score += 0; // Можна не писати, бо за замовчуванням +0
    });

    return score;
}

  function getLevel(score) {
    if (score >= 14) return "Високий";
    if (score >= 7) return "Середній";
    return "Низький";
}
    const finalScore = calculateScoreMotivation(); 
        const level = getLevel(finalScore);

    // const studentName = prompt("Введіть ваше ім'я:");
    // if (!studentName || studentName.trim() === "") {
    //   alert("❗ Будь ласка, введіть ім'я.");
    //   return;
    // }
        console.log("🔹 Надсилаємо:", { score: finalScore, level });

    submitResults(finalScore, level, getEntryIDs(), studentName);
  });



});
