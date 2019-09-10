//initial values
let counter = 15;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//if the timer is over go to next question
function nextQuestion() {
    const isGameOver = (quizQuestions.length - 1) === currentQuestion;
    if (isGameOver) {
        //todo
        console.log('gameover');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

//start a timer
function timeUp() {
    clearInterval(timer);

    lost++;

    nextQuestion();
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

//display choices and questions on browser
function loadQuestion() {
    counter = 15;
    timer = setInterval(countDown, 1000)

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
    <h4>${question}<h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}


//check answers for right or wrong
//event handlers
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        //TODO
        //USERWINS
        score++;
        console.log('winnnn');
        nextQuestion();
    } else {
        lost++;
        console.log('loser');
        nextQuestion();
    }
});;


function displayResult() {
    const result = `
    <p>you got ${score} question(s) right! </p>
    <p>you got ${lost} question(s) wrong! </p>
    <p>Total questions ${quizQuestions.length} </p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on('click', '#reset', function () {
    counter = 15;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});

function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`



    
};
console.log(currentQuestion);
console.log(quizQuestions);
loadQuestion();