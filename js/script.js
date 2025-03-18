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
        const scriptURL = getEntryIDs(); 
        submitResults(finalScore, level, scriptURL);
      });
    }
  });
 window.getEntryIDs = function() {
  const currentPage = window.location.pathname;

  if (currentPage.includes("upiznay_fihury.html")) {
    return {
      formURL: "https://docs.google.com/forms/d/e/ВАШ_ФОРМУЛЯР_FIGURES/formResponse",
      name: "entry.1111111111",
      score: "entry.2222222222",
      level: "entry.3333333333"
    };
  }

  if (currentPage.includes("matrytsya_ravena.html")) {
    return {
      formURL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyylO6_4cpbzuD6THcT95VMAW5R7Foy1qykWDloI7Rew2b1g/formResponse",
      name: "entry.1280933263",
      score: "entry.1008291282",
      level: "entry.1332224844"
    };
  }

  if (currentPage.includes("cognitive_skills/")) {
    return {
      formURL: "https://docs.google.com/forms/d/e/ВАШ_ФОРМУЛЯР_MOTIVATION/formResponse",
      name: "entry.7777777777",
      score: "entry.8888888888",
      level: "entry.9999999999"
    };
  }

  return null;
};
 
  
  


console.log("🔹 URL сторінки:", window.location.href); 


  
 


  window.submitResults = function(finalScore, level) {
  const studentName = prompt("Введіть ваше ім'я:");
  
  if (!studentName || studentName.trim() === "") {
    alert("❗ Будь ласка, введіть ім'я.");
    return;
  }

  const entryIDs = getEntryIDs();
  if (!entryIDs) {
    console.error("❌ Не вдалося знайти entry ID для цієї сторінки.");
    return;
  }

  fetch(entryIDs.formURL, {
    method: "POST",
    mode: "no-cors", // ❗ Обов'язково, щоб уникнути CORS-обмежень
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      [entryIDs.name]: studentName,
      [entryIDs.score]: finalScore,
      [entryIDs.level]: level
    })
  })
  .then(() => {
    alert("✅ Дані успішно надіслані у Google Forms!");
    document.getElementById("send-results-btn").style.display = "none"; // ✅ Приховуємо кнопку
  })
  .catch(error => console.error("❌ Помилка надсилання:", error));
};

  
  
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

