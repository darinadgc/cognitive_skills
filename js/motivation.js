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

    if (totalQuestions.size !== answeredQuestions.size) {
        alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
        return false;
    }
    return true;

    //return { totalQuestions, answeredQuestions };
}

// ✅ Якщо всі відповіді є, визначаємо оцінку
function calculateScoreMotivation() {
    let score = 0;
    const checkedAnswers = document.querySelectorAll('input[type="radio"]:checked');
      console.log("🔹 Знайдено позначені відповіді:", checkedAnswers.length); // ✅ Чи є відповіді?
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

// ✅ Виконуємо перевірку перед підрахунком результатів
const checkResults = checkAllAnsweredMotivation();
if (checkResults !== null) {
    

    console.log("✅ Надсилаємо:", { score: finalScore, level });
    submitResults(finalScore, level, getEntryIDs());
}
