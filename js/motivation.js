document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll('input[type="radio"]');
      const totalQuestions = new Set();
      let answeredQuestions = new Set();
      // ✅ Додаємо всі унікальні групи питань у `totalQuestions`
      questions.forEach((input) => totalQuestions.add(input.name));

      // ✅ Додаємо відповіді користувача у `answeredQuestions`
      questions.forEach((input) => {
          if (input.checked) {
              answeredQuestions.add(input.name);
          }
      });

      // ✅ Тільки тепер визначаємо оцінку
      function calculateScoreMotivation() {
          let score = 0;
          questions.forEach((input) => {
              if (input.checked) {
                  if (input.value === "високий рівень") score += 2;
                  else if (input.value === "середній рівень") score += 1;
              }
          });
          return score;
      }

      function getLevel(score) {
          if (score >= 14) return "Високий";
          if (score >= 7) return "Середній";
          return "Низький";
      }


// ✅ Викликаємо `submitResults` тільки після всіх перевірок
      submitResults(finalScore, level, getEntryIDs(), studentName);
      
  if (totalQuestions.size === answeredQuestions.size) {
sendResultsBtn.addEventListener("click", () => {
      // ✅ Перевіряємо, чи відповіли на всі запитання (ЗУПИНЯЄМО КОД, якщо ні)
      // ✅ Після перевірки запитуємо ім'я
      // const studentName = prompt("Введіть ваше ім'я:").trim();
      // if (!studentName || studentName.length < 2) {
      //     alert("❗ Будь ласка, введіть коректне ім'я.");
      //     return;
      // }

  const finalScore = calculateScoreMotivation();
      const level = getLevel(finalScore);        
  }); // ✅click
 }       
 else alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
          return; // ❌ Зупиняємо виконання, якщо є пропущені питання
      
          

});
