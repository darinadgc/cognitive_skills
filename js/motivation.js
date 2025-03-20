window.checkAllAnsweredMotivation = function() {
    const questions = document.querySelectorAll('input[type="radio"]');
    const totalQuestions = new Set();
    let answeredQuestions = new Set();

    questions.forEach((input) => totalQuestions.add(input.name));
    questions.forEach((input) => {
        if (input.checked) {
            answeredQuestions.add(input.name);
        }
    });

    console.log("🔹 Загальна кількість питань:", totalQuestions.size);
    console.log("🔹 Відповіді:", answeredQuestions.size);

    return { totalQuestions, answeredQuestions };
};

function calculateScoreMotivation() {
    let score = 0;
    const checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    
    console.log("🔹 Знайдено відповідей:", checkedAnswers.length);
    
    checkedAnswers.forEach((input) => {
        if (input.value === "високий рівень") score += 2;
        else if (input.value === "середній рівень") score += 1;
    });

    console.log("🔹 Обчислений бал:", score);
    return score;
}

function getLevel(score) {
    if (score >= 14) return "Високий";
    if (score >= 7) return "Середній";
    return "Низький";
}

// ✅ Виконуємо обчислення ТІЛЬКИ після натискання кнопки
document.addEventListener("DOMContentLoaded", () => {
    const sendResultsBtn = document.getElementById("send-results-btn");

    sendResultsBtn.addEventListener("click", () => {
        console.log("✅ Натискання кнопки: Перевіряємо відповіді...");

        // Виконуємо перевірку заповнених відповідей
        const checkResults = checkAllAnsweredMotivation();
        if (checkResults.totalQuestions.size === checkResults.answeredQuestions.size) {

// ✅ Тільки тепер підраховуємо бали
        const finalScore = calculateScoreMotivation();
        const level = getLevel(finalScore);

        console.log("✅ Надсилаємо:", { score: finalScore, level });

        // Викликаємо submitResults з правильними значеннями
        submitResults(finalScore, level, getEntryIDs());
        }
        else  {
            alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
            return;
        }
    });
});
