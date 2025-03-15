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
    const currentPage = window.location.pathname;
  
    if (currentPage.includes("figures")) {
      return "https://script.google.com/macros/s/AKfycbyHPX-5dhnfRK-0iTnStfGJ8JIbI5bzzhJlIh6omNJGfnErFqlqtqVWbhXsrEH9dzmUIw/exec";
    }
  
    if (currentPage.includes("matrytsya_ravena")) {
      return "https://script.google.com/macros/s/AKfycbxhucGaceo5tAFqeMjuw3K_QpDKZEVFhNoczMmCll3ubpdTpxpW2IoDSnO9emYE8smGNQ/exec";
    }
  
    if (currentPage.includes("motivation")) {
      return "https://script.google.com/macros/s/AKfycbz1cDVhStwTTo1067FB7SpT34cNd28zl5cVErG-V_bu1SrfQDf44KovAqP57fKsp8mFbQ/exec";
    }
  
    return null;
  }
  
 


  window.submitResults = function(finalScore, level, scriptURL, studentName) {
    if (!studentName || studentName.trim() === "") {
      alert("❗ Будь ласка, введіть ім'я.");
      return;
    }
  
    fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: studentName,
        score: finalScore,
        level: level,
        time: new Date().toLocaleString()
      }),
    })
    .then(() => {
      localStorage.setItem("lastAttemptFigures", new Date().toISOString());
  
      const resultEl = document.getElementById("result");
      if (resultEl) {
        resultEl.innerHTML = `<strong>Дякуємо за проходження! Успіхів!</strong>`;
      }
  
      document.getElementById("send-results-btn").style.display = "none"; // ✅ Приховуємо кнопку
    })
    .catch(error => console.error("❌ Помилка надсилання:", error));
  // ✅ Приховуємо кнопку після надсилання
  sendResultsBtn.style.display = "none";
  
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

