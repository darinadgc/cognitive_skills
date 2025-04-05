
document.addEventListener("DOMContentLoaded", () => {
    	 const main = document.querySelector("main");
const resultEl = document.getElementById("result");    // const lastAttemptKey = getLastAttemptKey(); // ✅ Отримуємо ключ для LocalStorage
    // const lastAttempt = localStorage.getItem(lastAttemptKey); // ✅ Оголошуємо lastAttempt
    // const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;
   const header = document.querySelector("header");
    	// const bodyContent = document.querySelector("body");
    	 const footer = document.querySelector("footer");
 const startBtn = document.getElementById("start-btn");
window.sendResultsBtn = document.getElementById("send-results-btn");
    // Виклик функції перевірки обмежень
   // if (!checkTestRetry(main)) {
       // console.log("❌ Ви вже проходили тест. Повідомлення відображено.");
       //  return; Зупиняємо подальше виконання, якщо тест вже був пройдений
    //}
 const taskContainer = document.getElementById("task-container-raven");
  const timerEl = document.getElementById("timer");
  let currentTaskIndex = 0;
  let score = 0;//  let score;
  let timerInterval;
      window.calculateLevel = function(score) {
    if (score === 10) return "Дуже високий";
    if (score >= 8) return "Високий";
    if (score >= 4) return "Середній";
    if (score >= 2) return "Низький";
    return "Дуже низький";
};
const tasks = [
    {
        image: "img/matrytsya_ravena/matrytsya_ravena1.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena1_1.png",
            "img/matrytsya_ravena/matrytsya_ravena1_2.png",
            "img/matrytsya_ravena/matrytsya_ravena1_3.png",
            "img/matrytsya_ravena/matrytsya_ravena1_4.png",
            "img/matrytsya_ravena/matrytsya_ravena1_5.png",
            "img/matrytsya_ravena/matrytsya_ravena1_6.png",
            "img/matrytsya_ravena/matrytsya_ravena1_7.png",
            "img/matrytsya_ravena/matrytsya_ravena1_8.png"
        ],
        correct: 7
    },
    {
        image: "img/matrytsya_ravena/matrytsya_ravena2.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena2_1.png",
            "img/matrytsya_ravena/matrytsya_ravena2_2.png",
            "img/matrytsya_ravena/matrytsya_ravena2_3.png",
            "img/matrytsya_ravena/matrytsya_ravena2_4.png",
            "img/matrytsya_ravena/matrytsya_ravena2_5.png",
            "img/matrytsya_ravena/matrytsya_ravena2_6.png",
            "img/matrytsya_ravena/matrytsya_ravena2_7.png",
            "img/matrytsya_ravena/matrytsya_ravena2_8.png"
        ],
        correct: 6
    },
    {
        image: "img/matrytsya_ravena/matrytsya_ravena3.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena3_1.png",
            "img/matrytsya_ravena/matrytsya_ravena3_2.png",
            "img/matrytsya_ravena/matrytsya_ravena3_3.png",
            "img/matrytsya_ravena/matrytsya_ravena3_4.png",
            "img/matrytsya_ravena/matrytsya_ravena3_5.png",
            "img/matrytsya_ravena/matrytsya_ravena3_6.png",
            "img/matrytsya_ravena/matrytsya_ravena3_7.png",
            "img/matrytsya_ravena/matrytsya_ravena3_8.png"
        ],
        correct: 6
    }
,
    {
         image: "img/matrytsya_ravena/matrytsya_ravena4.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena4_1.png",
            "img/matrytsya_ravena/matrytsya_ravena4_2.png",
            "img/matrytsya_ravena/matrytsya_ravena4_3.png",
            "img/matrytsya_ravena/matrytsya_ravena4_4.png",
            "img/matrytsya_ravena/matrytsya_ravena4_5.png",
            "img/matrytsya_ravena/matrytsya_ravena4_6.png",
            "img/matrytsya_ravena/matrytsya_ravena4_7.png",
            "img/matrytsya_ravena/matrytsya_ravena4_8.png"
        ], correct: 1 },
    { image: "img/matrytsya_ravena/matrytsya_ravena5.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena5_1.png",
            "img/matrytsya_ravena/matrytsya_ravena5_2.png",
            "img/matrytsya_ravena/matrytsya_ravena5_3.png",
            "img/matrytsya_ravena/matrytsya_ravena5_4.png",
            "img/matrytsya_ravena/matrytsya_ravena5_5.png",
            "img/matrytsya_ravena/matrytsya_ravena5_6.png",
            "img/matrytsya_ravena/matrytsya_ravena5_7.png",
            "img/matrytsya_ravena/matrytsya_ravena5_8.png"
        ], correct: 2 },
    { image: "img/matrytsya_ravena/matrytsya_ravena6.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena6_1.png",
            "img/matrytsya_ravena/matrytsya_ravena6_2.png",
            "img/matrytsya_ravena/matrytsya_ravena6_3.png",
            "img/matrytsya_ravena/matrytsya_ravena6_4.png",
            "img/matrytsya_ravena/matrytsya_ravena6_5.png",
            "img/matrytsya_ravena/matrytsya_ravena6_6.png",
            "img/matrytsya_ravena/matrytsya_ravena6_7.png",
            "img/matrytsya_ravena/matrytsya_ravena6_8.png"
        ], correct: 5 },
    { image: "img/matrytsya_ravena/matrytsya_ravena7.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena7_1.png",
            "img/matrytsya_ravena/matrytsya_ravena7_2.png",
            "img/matrytsya_ravena/matrytsya_ravena7_3.png",
            "img/matrytsya_ravena/matrytsya_ravena7_4.png",
            "img/matrytsya_ravena/matrytsya_ravena7_5.png",
            "img/matrytsya_ravena/matrytsya_ravena7_6.png",
            "img/matrytsya_ravena/matrytsya_ravena7_7.png",
            "img/matrytsya_ravena/matrytsya_ravena7_8.png"
        ], correct: 6 },
    { image: "img/matrytsya_ravena/matrytsya_ravena8.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena8_1.png",
            "img/matrytsya_ravena/matrytsya_ravena8_2.png",
            "img/matrytsya_ravena/matrytsya_ravena8_3.png",
            "img/matrytsya_ravena/matrytsya_ravena8_4.png",
            "img/matrytsya_ravena/matrytsya_ravena8_5.png",
            "img/matrytsya_ravena/matrytsya_ravena8_6.png",
            "img/matrytsya_ravena/matrytsya_ravena8_7.png",
            "img/matrytsya_ravena/matrytsya_ravena8_8.png"
        ], correct: 1 },
    { image: "img/matrytsya_ravena/matrytsya_ravena9.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena9_1.png",
            "img/matrytsya_ravena/matrytsya_ravena9_2.png",
            "img/matrytsya_ravena/matrytsya_ravena9_3.png",
            "img/matrytsya_ravena/matrytsya_ravena9_4.png",
            "img/matrytsya_ravena/matrytsya_ravena9_5.png",
            "img/matrytsya_ravena/matrytsya_ravena9_6.png",
            "img/matrytsya_ravena/matrytsya_ravena9_7.png",
            "img/matrytsya_ravena/matrytsya_ravena9_8.png"
        ], correct: 3 },
    { image: "img/matrytsya_ravena/matrytsya_ravena10.jpg",
        options: [
            "img/matrytsya_ravena/matrytsya_ravena10_1.png",
            "img/matrytsya_ravena/matrytsya_ravena10_2.png",
            "img/matrytsya_ravena/matrytsya_ravena10_3.png",
            "img/matrytsya_ravena/matrytsya_ravena10_4.png",
            "img/matrytsya_ravena/matrytsya_ravena10_5.png",
            "img/matrytsya_ravena/matrytsya_ravena10_6.png",
            "img/matrytsya_ravena/matrytsya_ravena10_7.png",
            "img/matrytsya_ravena/matrytsya_ravena10_8.png"
        ], correct: 5 }

];//tasks











	
  // ✅ Додаємо обробник події ПІСЛЯ оголошення функції
  startBtn.addEventListener("click", startTest);

  function startTest() {
    console.log("🔹 startTest() запущено!");
    currentTaskIndex = 0;
    score = 0;
    taskContainer.style.display = "flex";
    startBtn.style.display = "none";
    sendResultsBtn.style.display = "none";
    startTimer(600);
    loadTask();
  }

  function startTimer(duration) {
    let timeLeft = duration;

    timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerEl.textContent = `⏳ ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(timerInterval);
        finishTest();
      }
    }, 1000);
  }

function loadTask() {
    const task = tasks[currentTaskIndex];

    taskContainer.innerHTML = `
        <div class="task-content">
            <img src="${task.image}" class="main-image">
            <div class="answer-options">
                <button id="next-btn" disabled>Далі</button>
                <div class="options">
                    ${task.options.map((imgSrc, index) => `
                        <img class="option" src="${imgSrc}" data-index="${index + 1}">
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    // Отримуємо всі варіанти відповідей
    const options = document.querySelectorAll(".option");
    let selectedOption = null;
taskContainer.classList.add("container-active");
header.classList.add("low-opacity"); 
footer.classList.add("container-color");
main.classList.add("container-color");
    options.forEach(option => {
        option.addEventListener("click", () => {
            // Знімаємо виділення з усіх варіантів
            options.forEach(opt => opt.classList.remove("selected"));

            // Виділяємо обраний варіант
            option.classList.add("selected");
            selectedOption = option.getAttribute("data-index");
            // Активуємо кнопку "Далі"
            document.getElementById("next-btn").disabled = false;
        });
    });

    // Додаємо подію для кнопки "Далі"
    document.getElementById("next-btn").addEventListener("click", () => {
        if (selectedOption !== null) {
            checkAnswer(selectedOption);
        }
    });
}


//✅ checkAnswer
function checkAnswer(selectedOption) {
    // Перетворюємо selectedOption у число
    const userAnswer = parseInt(selectedOption);
    
    // Перевіряємо, чи відповідає правильному варіанту
    if (userAnswer === tasks[currentTaskIndex].correct) {
        score++;
    }

    // Переходимо до наступного завдання
    currentTaskIndex++;

    if (currentTaskIndex < tasks.length) {
        loadTask();
    } else {
        finishTest();
    }

    console.log("✅ Підрахований бал:", score);
}
//✅ checkAnswer let
/*window.calculateScore = function () {
    
    const answers = document.querySelectorAll('input[type="radio"]:checked');

    answers.forEach((input) => {
        if (input.value === "1") score++; // Припустимо, що правильні відповіді мають value="1"
    });
};*/

 //🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁🏁finishTest
  function finishTest() {
header.classList.remove("low-opacity"); 
         taskContainer.classList.remove("container-active");

footer.classList.remove("container-color");
main.classList.remove("container-color"); 

    clearInterval(timerInterval);
    resultEl.innerHTML = "🛑 Тест завершено! Натисніть 'Надіслати результат'.";
    taskContainer.innerHTML = "";
    sendResultsBtn.style.display = "block";
  }//🏁finishTest


// 🏫🧒📛 Функція для запиту імені студента
window.askStudentName = function () {
    let studentName = prompt("Введіть ваші ім'я та першу літеру прізвища:").trim();

    if (!studentName || studentName.length < 2) {
        alert("❗ Будь ласка, введіть ім'я, більше за 1 символ.");
        return null;  // ❌ Якщо ім'я некоректне, повертаємо null
    }

    // ✅ Фільтр символів у імені
    let cleanedStudentName = studentName.replace(/[^a-zA-ZА-Яа-яЇїІіЄєҐґ0-9.' ]/g, "");

    return cleanedStudentName;  // ✅ Повертаємо очищене ім'я
};// 🏫🧒📛 Функція для запиту імені студента

  
window.getEntryIDs = function () {
    
 
        
        return {
            formURL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfyylO6_4cpbzuD6THcT95VMAW5R7Foy1qykWDloI7Rew2b1g/formResponse",
            name: "entry.511676966",
            score: "entry.1008291282",
            level: "entry.1332224844"
        }
      
        return null;

  };//getEntryIDs




  /* if (startBtn) {
        startBtn.addEventListener("click", () => {
            console.log("✅ Початок тесту: Матриця Равена");
            startTest();
        });
    } else {
        console.error("❌ start-btn не знайдено!");
    }*/


    sendResultsBtn.addEventListener("click", () => submitResults());
    });// DOMContentLoaded

window.submitResults = function(finalScore, level, entryIDs, sendStudentName) {
    console.log("📨 submitResults() запущено!");
    entryIDs = getEntryIDs();
    if (!entryIDs) {
        console.error(`❌ Не вдалося знайти entry ID для тесту: ${testType}`);
        return;
    }
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
    console.log("✅ Визначені entry IDs:", entryIDs);
    
    level = calculateLevel(score);  // Використовує глобальну змінну score
    sendStudentName = askStudentName();
    console.log("✅ Ім'я студента:", sendStudentName);
    console.log("✅ Визначені entry IDs:", entryIDs);
    console.log("✅ Обчислений бал:", score);
    console.log("✅ Визначений рівень:", level);

    if (!sendStudentName) {
        console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
        return;
    }
    if (isNaN(score) || !level) {
        console.error("❌ finalScore або level не визначено!");
        return;
    }

    const formData = new URLSearchParams();
    formData.append(entryIDs.name, sendStudentName);
    formData.append(entryIDs.score, Number(score));
    formData.append(entryIDs.level, String(level));

    console.log("🔹 Надсилаємо:", Object.fromEntries(formData));
    console.log("📩 Формат перед відправкою:", formData.toString());

    fetch(entryIDs.formURL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
    })
    .then(() => {
        console.log("✅ Успішно надіслано!");
        alert("✅ Дані успішно надіслані у Google Forms!");
        document.getElementById("send-results-btn").style.display = "none";
        resultEl.innerHTML = `<strong>Дякуємо за проходження!</strong>`;
          // Зберігаємо дату останньої спроби в localStorage
        //localStorage.setItem(getLastAttemptKey(), new Date().toISOString());
        //console.log("✅ Дата останньої спроби збережена:", new Date().toISOString());
    })
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
};// ✅ Головна функція для надсилання результатів у Google Forms






