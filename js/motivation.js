window.checkAllAnsweredMotivation = function() {
    const questions = document.querySelectorAll('input[type="radio"]');
    const totalQuestions = new Set();
    const answeredQuestions = new Set();

    let score = 0; // Загальний бал

    questions.forEach((input) => totalQuestions.add(input.name));

    questions.forEach((input) => {
        if (input.checked) {
            answeredQuestions.add(input.name);
            score += parseInt(input.value) || 0; // Додаємо бал, перетворюючи value в число
        }
    });

    console.log("🔹 Загальна кількість питань:", totalQuestions.size);
    console.log("🔹 Відповіді:", answeredQuestions.size);
    console.log("🔹 Обчислений бал:", score);

    return { totalQuestions, answeredQuestions, score };
};
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
