function checkAllAnsweredMotivation() {
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
return true;
    console.log("✅ Надсилаємо:", { score: finalScore, level });

    //return { totalQuestions, answeredQuestions };
}
// Перевіряємо, чи функція викликається
console.log("🔹 Викликаємо calculateScoreMotivation...");
const finalScore = calculateScoreMotivation();
console.log("🔹 Отриманий бал:", finalScore);
// ✅ Якщо всі відповіді є, визначаємо оцінку
function calculateScoreMotivation() {
    let score = 0;
    const checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    console.log("🔹 Знайдено відповідей:", checkedAnswers.length);
checkedAnswers.forEach((input) => {
        if (input.value === "високий рівень") score += 2;
        else if (input.value === "середній рівень") score += 1;
    });
    console.log("🔹 Обчислений бал:", score); // ✅ Додай це для перевірки
    return score;
}


function getLevel(score) {
    if (score >= 14) return "Високий";
    if (score >= 7) return "Середній";
    return "Низький";
}
const level = getLevel(finalScore);
console.log("🔹 Визначений рівень:", level);
    
// ✅ Виконуємо перевірку перед підрахунком результатів
// const checkResults = checkAllAnsweredMotivation();
// if (checkResults !== null) {
//     console.log("✅ Надсилаємо:", { score: finalScore, level });
//     submitResults(finalScore, level, getEntryIDs());
// }
console.log("🔹 Викликаємо calculateScoreMotivation...");
const finalScore = calculateScoreMotivation();
console.log("🔹 Отриманий бал:", finalScore);

// ✅ Переконайтеся, що `finalScore` не `undefined`
if (isNaN(finalScore)) {
    console.error("❌ Помилка: `finalScore` має некоректне значення!");
    return;
}
