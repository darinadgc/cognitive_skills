document.addEventListener("DOMContentLoaded", () => {
    const sendResultsBtn = document.getElementById("send-results-btn");

    sendResultsBtn.addEventListener("click", () => {
        const questions = document.querySelectorAll('input[type="radio"]');
        const totalQuestions = new Set();
        let answeredQuestions = new Set();

        // ✅ Додаємо всі унікальні групи питань у `totalQuestions`
        questions.forEach((input) => totalQuestions.add(input.name));

        // ✅ Додаємо відповіді користувача у `answeredQuestions`
        questions.forEach((input) => {
            if (input.checked) {
                answeredQuestions.add(input.name);
            }
        });

        // ✅ Перевіряємо, чи відповіли на всі запитання (ЗУПИНЯЄМО КОД, якщо ні)
        if (totalQuestions.size !== answeredQuestions.size) {
            alert("❗ Будь ласка, відповідайте на всі запитання перед завершенням!");
            return; // ❌ Зупиняємо виконання, якщо є пропущені питання
        }

        // ✅ Після перевірки запитуємо ім'я
        const studentName = prompt("Введіть ваше ім'я:").trim();
        if (!studentName || studentName.length < 2) {
            alert("❗ Будь ласка, введіть коректне ім'я.");
            return;
        }

        // ✅ Тільки тепер визначаємо оцінку
        function calculateScoreMotivation() {
            let score = 0;
            questions.forEach((input) => {
                if (input.checked) {
                    if (input.value === "високий рівень") score += 2;
                    else if (input.value === "середній рівень") score += 1;
                }
            });
            return score;
        }

        function getLevel(score) {
            if (score >= 14) return "Високий";
            if (score >= 7) return "Середній";
            return "Низький";
        }

        const finalScore = calculateScoreMotivation();
        const level = getLevel(finalScore);

        console.log("🔹 Надсилаємо:", { name: studentName, score: finalScore, level });

        // ✅ Викликаємо `submitResults` тільки після всіх перевірок
        submitResults(finalScore, level, getEntryIDs(), studentName);
    });
});
