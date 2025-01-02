export const fetchQuestions = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
    const data = await response.json();
    return data.results.map((item) => ({
        question: item.question,
        answers: [
            ...item.incorrect_answers.map((text) => ({ text, isCorrect: false })),
            { text: item.correct_answer, isCorrect: true },
        ].sort(() => Math.random() - 0.5),
    }));
};
