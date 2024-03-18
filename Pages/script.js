const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            {text: 'Hyper Transfer Markup Language', correct: false},
            {text: 'High-level Text Markup Language', correct: false},
            {text: 'Hyper Text Markup Language', correct: true},
            {text: 'Hyperlink and Text Markup Language', correct: false},
        ]  
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            {text: 'Cascading Style Sheets', correct: true},
            {text: 'Computer Style Sheets', correct: false},
            {text: 'Colorful Style Sheets', correct: false},
            {text: 'Creative Style Sheets', correct: false},
        ]  
    },
    {
        question: 'What is Tailwind CSS?',
        answers: [
            {text: 'An integrated development environment', correct: false},
            {text: 'A gentle breeze', correct: false},
            {text: 'A HTML section', correct: false},
            {text: 'A framework for CSS', correct: true},
        ]  
    },
    {
        question: 'Which of these is another framework that can be used for CSS?',
        answers: [
            {text: 'Node.js', correct: false},
            {text: 'Bootstrap', correct: true},
            {text: 'Python', correct: false},
            {text: "Tailwind Elite++", correct: false},
        ]  
    },
    {
        question: 'All of the following are HTML tags except?',
        answers: [
            {text: 'body', correct: false},
            {text: 'leg', correct: true},
            {text: 'head', correct: false},
            {text: 'html', correct: false},
        ]  
    },
    {
        question: 'Choose the correct HTML tag for the largest heading:',
        answers: [
            {text: 'head', correct: false},
            {text: 'h6', correct: false},
            {text: 'h1', correct: true},
            {text: 'p', correct: false},
        ]  
    },
    {
        question: 'All of the following are methods for adding CSS to and HTML file except:',
        answers: [
            {text: 'external', correct: false},
            {text: 'internal', correct: false},
            {text: 'outline', correct: true},
            {text: 'inline', correct: false},
        ]  
    },
    {
        question: 'Which of the following best describes the concept of utility-first in Tailwind CSS?',
        answers: [
            {text: 'Using utility classes to quickly apply styles without writing custom CSS', correct: true},
            {text: 'Writing extensive CSS files from scratch to style web elements', correct: false},
            {text: 'Prioritizing complex CSS selectors for precise styling in Tailwind CSS', correct: false},
            {text: 'Relying solely on pre-built templates for web design in Tailwind CSS', correct: false},
        ]  
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("quizbtn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score Is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();