document.addEventListener("DOMContentLoaded", () => {
  const sendResultsBtn = document.getElementById("send-results-btn");
  window.resultEl = document.getElementById("result");


  

  console.log("✅ Обробник події додано до `send-results-btn`.");

console.log("✅ Виклик submitResults");

  const lastAttemptKey = getLastAttemptKey(); // ✅ Для кожного тесту свій ключ
  const lastAttempt = localStorage.getItem(lastAttemptKey);
  const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;

  
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
  
  
    
  
  
    
  
    
  

 
 window.getEntryIDs = function() {
  const currentPage = window.location.pathname;
  console.log("🔹 Визначаємо entry ID для сторінки:", currentPage);

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
      name: "entry.511676966",
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
 
    // ✅ Якщо є кнопка, додаємо обробник події для надсилання результату
    if (sendResultsBtn) {
      sendResultsBtn.addEventListener("click", () => {
        const finalScore = calculateScore();
        const level = calculateLevel(finalScore);
        submitResults(finalScore, level);
      });
    }
    


console.log("🔹 URL сторінки:", window.location.href); 


  
 

window.submitResults = function(finalScore, level) {
    if (window.isSubmitting) return;
    window.isSubmitting = true;

    console.log("✅ Функція submitResults викликана!");

    let studentName = prompt("Введіть ваше ім'я:").trim();
    if (!studentName || studentName.length < 2) {
        alert("❗ Будь ласка, введіть коректне ім'я.");
        window.isSubmitting = false;
        return;
    }
    studentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ' ]/g, "");

    console.log("🔹 Введене ім'я:", studentName);
    const entryIDs = getEntryIDs();
    if (!entryIDs || !entryIDs.formURL) {
        console.error("❌ Не вдалося знайти entry ID для цієї сторінки.");
        alert("❌ Помилка! Не вдалося знайти entry ID.");
        window.isSubmitting = false;
        return;
    }

    console.log("🔹 Отримані entry IDs:", entryIDs);

    const formData = new URLSearchParams();
    formData.append(entryIDs.name, studentName);
    formData.append(entryIDs.score, String(Number(finalScore))); // Перетворення `score` у число
    formData.append(entryIDs.level, level);

    console.log("🔹 Надсилаємо:", Object.fromEntries(formData));
console.log("🔹 Данні перед відправкою:");
console.log("🔹 formURL:", entryIDs.formURL);
console.log("🔹 Ім'я:", studentName);
console.log("🔹 Оцінка:", finalScore);
console.log("🔹 Рівень:", level);

    fetch(entryIDs.formURL, {
        method: "POST",
        mode: "no-cors", // Заборона CORS-блокування
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
};


// window.submitResults = function(finalScore, level) {
//     if (window.isSubmitting) return;
//     window.isSubmitting = true;

//     console.log("✅ Функція submitResults викликана!");

//     let studentName = prompt("Введіть ваше ім'я:").trim();
//     if (!studentName || studentName.length < 2) {
//         alert("❗ Будь ласка, введіть коректне ім'я.");
//         window.isSubmitting = false;
//         return;
//     }
//     studentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ' ]/g, "");

//     console.log("🔹 Введене ім'я:", studentName);
//     const entryIDs = getEntryIDs();
//     if (!entryIDs || !entryIDs.formURL) {
//         console.error("❌ Не вдалося знайти entry ID для цієї сторінки.");
//         alert("❌ Помилка! Не вдалося знайти entry ID.");
//         window.isSubmitting = false;
//         return;
//     }
//     console.log("🔹 Отримані entry IDs:", entryIDs);

//     const formData = new URLSearchParams();
//     formData.append(entryIDs.name, studentName);
//     formData.append(entryIDs.score, Number(finalScore));
//     formData.append(entryIDs.level, level);

//     console.log("🔹 Надсилаємо:", Object.fromEntries(formData));

//     fetch(entryIDs.formURL, {
//         method: "POST",
//         mode: "no-cors", // Запобігає CORS-блокуванню
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: formData
//     })
//     .then(() => {
//         console.log("✅ Успішно надіслано!");
//         alert("✅ Дані успішно надіслані у Google Forms!");
//         document.getElementById("send-results-btn").style.display = "none";
//     })
//     .catch(error => {
//         console.error("❌ Помилка надсилання:", error);
//         alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
//     })
//     .finally(() => {
//         window.isSubmitting = false;
//     });
// };






 sendResultsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    if (window.isSubmitting) return; // Запобігає повторному виклику
    window.isSubmitting = true;

    const finalScore = calculateScore();
    const level = calculateLevel(finalScore);
    submitResults(finalScore, level);
  });
 
 

  
  
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
  if (currentPage.includes("motivation")) return "lastAttemptMotivation";
  if (currentPage.includes("matrytsya_ravena")) return "lastAttemptRaven";
  if (currentPage.includes("figures")) return "lastAttemptFigures";
  return "lastAttemptDefault"; // Fallback to prevent undefined
  // return null; Запобігає помилці

}
 });
