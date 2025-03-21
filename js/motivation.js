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
           console.log("🔹 Обчислений бал:", score);
 }
   

function getLevel(score) {
    if (score > 13) return "Високий";
    if (score > 7) return "Середній";
    return "Низький";
}



// ✅ Виконуємо обчислення ТІЛЬКИ після натискання кнопки
// document.addEventListener("DOMContentLoaded", () => {
//     const sendResultsBtn = document.getElementById("send-results-btn");});

    //sendResultsBtn.addEventListener("click", () => {});
  
    //sendResultsBtn click
//DOMContentLoaded
