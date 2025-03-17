document.addEventListener("DOMContentLoaded", () => {
  const sendResultsBtn = document.getElementById("send-results-btn");
  window.resultEl = document.getElementById("result");


  const lastAttemptKey = getLastAttemptKey(); // ✅ Для кожного тесту свій ключ
  const lastAttempt = localStorage.getItem(lastAttemptKey);

  
  window.calculateScore = function() {
    const questions = document.querySelectorAll('input[type="radio"]');
    let score = 0;
  
    questions.forEach((input) => {
      if (input.checked && input.value === "1") {
        score++;
      }
    });
  
    return score;
  }
  window.calculateLevel = function(score) {
    if (score === 10) return "Дуже високий";
    if (score >= 8) return "Високий";
    if (score >= 4) return "Середній";
    if (score >= 2) return "Низький";
    return "Дуже низький";
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const sendResultsBtn = document.getElementById("send-results-btn");
    window.resultEl = document.getElementById("result");
  
    const lastAttemptKey = getLastAttemptKey(); // ✅ Для кожного тесту свій ключ
    const lastAttempt = localStorage.getItem(lastAttemptKey);
  
    
  
    // ✅ Функція для підрахунку балів
    window.calculateScore = function() {
      const questions = document.querySelectorAll('input[type="radio"]');
      let score = 0;
  
      questions.forEach((input) => {
        if (input.checked && input.value === "1") {
          score++;
        }
      });
  
      return score;
    }
  
    // ✅ Якщо є кнопка, додаємо обробник події для надсилання результату
    if (sendResultsBtn) {
      sendResultsBtn.addEventListener("click", () => {
        const finalScore = calculateScore(); 
        const level = calculateLevel(finalScore);
        const scriptURL = getScriptURL(); 
        submitResults(finalScore, level, scriptURL);
      });
    }
  });
  
  
  window.getScriptURL = function() {
  const currentPage = window.location.href; // ✅ Перевіряємо повний URL

  if (currentPage.includes("figures.html")) {
    return "https://script.google.com/macros/s/AKfycbyHPX-5dhnfRK-0iTnStfGJ8JIbI5bzzhJlIh6omNJGfnErFqlqtqVWbhXsrEH9dzmUIw/exec";
  }

  if (currentPage.includes("matrytsya_ravena.html")) {
    return "https://script.google.com/macros/s/AKfycbwR8mN_h2ZurDNqzbkZ5hHOeYNKfiJX-IAaEoJ1Sx8kaopK5wMHvbBGwFNFOC2fYd57Ew/exec";
  }

  if (currentPage.includes("cognitive_skills/")) {
    return "https://script.google.com/macros/s/AKfycbz5ugdlVgJFLUJMDJVWyjvVHaI1V2M6j3QnyvDlvy9wmqJ-JVxv6mqoGt4BnfU1GOCBRA/exec";
  }

  console.error("❌ Не вдалося визначити Google Apps Script URL");
  return null;
}


console.log("🔹 URL сторінки:", window.location.href); 
console.log("🔹 Отриманий scriptURL:", getScriptURL());

console.log(getScriptURL());

  
 


  window.submitResults = function(finalScore, level, scriptURL, studentName) {
    if (!studentName || studentName.trim() === "") {
      alert("❗ Будь ласка, введіть ім'я.");
      return;
    }
  
   // const scriptURL = getScriptURL();

if (!scriptURL) {
  console.error("❌ Не отримано URL Google Apps Script");
  return;
}

fetch(scriptURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: studentName,
    score: finalScore,
    level: level
  }),
  mode: "no-cors" // ✅ Уникаємо CORS-помилки
})
.then(response => {
  console.log("✅ Успішно надіслано:", response);
})
.catch(error => console.error("❌ Помилка надсилання:", error));









  // ✅ Приховуємо кнопку після надсилання
  
  
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
//   resultEl.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(new Date(lastAttempt))} днів.`;
//   sendResultsBtn.disabled = true;
//   return;
// }


  function getLastAttemptKey() {
    const currentPage = window.location.pathname;
    if (currentPage.includes("motivation")) return "lastAttemptMotivation";
    if (currentPage.includes("matrytsya_ravena")) return "lastAttemptRaven";
    if (currentPage.includes("figures")) return "lastAttemptFigures";
  }
});

