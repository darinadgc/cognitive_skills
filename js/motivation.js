window.checkAllAnsweredMotivation = function() {
    const questions = document.querySelectorAll('input[type="radio"]');
    window.totalQuestions = new Set();
    window.answeredQuestions = new Set();
    questions.forEach((input) => totalQuestions.add(input.value));
    questions.forEach((input) => {
        if (input.checked) {
            answeredQuestions.add(input.value);
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
    
    // checkedAnswers.forEach((input) => {
    //     if (input.value === "високий рівень") score += 2;
    //     else if (input.value === "середній рівень") score += 1;
    // });
    score = (checkedAnswers) =>{
        for (let i = 0; i<checkedAnswers.length; i++) {
            score+=(parseInt(checkedAnswers[i].value));
         }
         return score; 
        }
    console.log("🔹 Обчислений бал:", score);
    return score;
}

function getLevel(score) {
    score = parseInt(score); // Переконуємось, що це число

    if (score <= 7) {
        return "Низький";
    } 
    else if (score > 7 && score <= 13) {
        return "Середній";
    } 
    else {
        return "Високий";
    }
}


// ✅ Виконуємо обчислення ТІЛЬКИ після натискання кнопки
// document.addEventListener("DOMContentLoaded", () => {
//     const sendResultsBtn = document.getElementById("send-results-btn");});

    //sendResultsBtn.addEventListener("click", () => {});
  
    //sendResultsBtn click
//DOMContentLoaded
