// Визначення функції getLastAttemptKey
function getLastAttemptKey() {
    return "lastAttemptMotivation";
}

// ✅ Функція перевірки обмежень 
function checkTestRetry(retryElement) {
    const lastAttemptKey = getLastAttemptKey();
    const lastAttempt = localStorage.getItem(lastAttemptKey);
    const lastAttemptDate = lastAttempt ? new Date(lastAttempt) : null;

    console.log("lastAttempt:", lastAttempt); // Лог для перевірки збережених даних
    console.log("lastAttemptDate:", lastAttemptDate); // Лог для перевірки дати

    if (lastAttemptDate && !isAllowedToRetry(lastAttemptDate)) {
        retryElement.innerHTML = `❌ Ви вже проходили тест. Можна повторити через ${daysUntilRetry(lastAttemptDate)} днів.`;
        return false;
    }

    return true;
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

document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    window.resultElMotivation = document.getElementById("result-motivation");
    const sendResultsBtnMotivation = document.getElementById("send-results-motivation-btn");

    // Виклик функції перевірки обмежень
    if (!checkTestRetry(main)) {
        console.log("❌ Ви вже проходили тест. Повідомлення відображено.");
        return; // Зупиняємо подальше виконання, якщо тест вже був пройдений
    }

    // Обробник події для кнопки "send-results"
    sendResultsBtnMotivation.addEventListener("click", () => {
        let checkResults = checkAllAnsweredMotivation();
        console.log("Відповіді ", checkResults.answeredQuestions);
        console.log("🔍 Перевірка checkResults:", checkResults);
        console.log("🔍 answeredQuestions:", checkResults.answeredQuestions);
        console.log("🔍 totalQuestions:", checkResults.totalQuestions);

        if (checkResults.answeredQuestions === checkResults.totalQuestions) {
            console.log("🚀 Виклик submitResults()");
            submitResults(checkResults.score); // ✅ Викликаємо submitResults
        } else {
            alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
            console.log("Відповіді ", answeredQuestions);
            return;
        }
    });
});

// Функція для збереження результатів та дати останньої спроби
window.submitResults = function(finalScore, level, entryIDs, sendStudentName) {
    console.log("📨 submitResults() запущено!");
    entryIDs = getEntryIDs();

    if (!entryIDs) {
        console.error(`❌ Не вдалося знайти entry ID для тесту`);
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

    let selectedEntryIDs = entryIDs; // ✅ Правильне призначення
    sendStudentName = askStudentName();
    console.log("✅ Ім'я студента:", sendStudentName);
    finalScore = 0;
    level = "";

    if (!sendStudentName) {
        console.error("❌ askStudentName() повернула `null`. Виконання зупинено.");
        return;
    }
    console.log("🔍 Викликаємо calculateScoreMotivation...");
    finalScore = calculateScoreMotivation();
    console.log("✅ finalScore після розрахунку:", finalScore);

    level = getLevelMotivation(finalScore);
    console.log("✅ Визначений рівень:", level);

    const formData = new URLSearchParams();
    formData.append(entryIDs.name, sendStudentName);
    formData.append(entryIDs.score, Number(finalScore));
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
        sendResultsBtnMotivation.style.display = "none";
        resultElMotivation.innerHTML = `<strong>Дякуємо за відповіді!</strong>`;

        // Зберігаємо дату останньої спроби в localStorage
        localStorage.setItem(getLastAttemptKey(), new Date().toISOString());
    })
    .catch(error => {
        console.error("❌ Помилка надсилання:", error);
        alert("❌ Не вдалося надіслати результати. Будь ласка, спробуйте ще раз.");
    })
    .finally(() => {
        window.isSubmitting = false;
    });
};
