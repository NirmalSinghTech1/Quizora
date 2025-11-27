// DOM Elements
const scoreEl = document.querySelector('.score')
const currentQuestion = document.querySelector('.current-question')
const progressBar = document.querySelector('.progress-bar')
const countdownProgressBar = document.querySelector('.countdown-progress-bar')
const timeleft = document.querySelector('.time-left')
const optionsList = document.querySelector('.options-list')
const question = document.querySelector('.question')
const explanation = document.querySelector('.explanation')
const nextButton = document.querySelector('.next-button')

// Document click event to check which option user select
document.addEventListener('click', (e) => {
    e.target.dataset.option && checkOption(e.target)
})

// Handle next question
nextButton.addEventListener('click', () => {
    nextQuestion()
})

// Global variables
const quizData = JSON.parse(sessionStorage.getItem('data')) || []
let currentIndex = 0
let score = 0
let timerId

// Renders quiz on the screen
function renderQuiz(index) {
    if(quizData.length > 0 || quizData !== null) {
        let totalQuestions = quizData.length
    
        currentQuestion.innerText = `Question ${index + 1} of ${totalQuestions}`
        progressBar.style.width = `${(index + 1) / totalQuestions * 100}%`
        handleCountdown()
        renderOptions(quizData[index])
        correctAnswer(quizData[index])
    }
}
renderQuiz(currentIndex)


// starts a countdown timer for 30 seconds for each question
function handleCountdown() {
    let totalTime = 30;

    if(timerId){
        clearInterval(timerId)
    }
    
    // updating UI of progress bar and countdown every second
    timerId = setInterval(() => {
        console.log("timer", timerId)
        timeleft.innerText = totalTime
        countdownProgressBar.style.width = `${totalTime / 30 * 100}%`
        if(totalTime <= 0){
            clearInterval(timerId)
            nextQuestion()
        }
        totalTime--;
    }, 1000);
    
}

// Render available options for the user to select on the screen
function renderOptions(data) {
    const availableOptions = data.answers
    question.innerText = data.question

    optionsList.innerText = ''
    for(let [key, value] of Object.entries(availableOptions)) {
        if(value !== null) {
            const li = document.createElement('li')
            li.setAttribute('data-option', `${key}`)
            li.innerText = value
            optionsList.appendChild(li) 
        }
    }
}

// Get which option is correct from API data stored in session storage
function correctAnswer(data) {
    const correctAnswer = data.correct_answers
    for(let [key, value] of Object.entries(correctAnswer)) {
        if(value === 'true') {
            return key.substring(0, 8)
        }
    }
}

// Checks whether the selected option is correct
let throttleTimeout = null
function checkOption(selectedOption) {
    if(throttleTimeout !== null) return;
    const correctOption = correctAnswer(quizData[currentIndex])
    nextButton.disabled = false

    if(throttleTimeout === null){
        // Increases score to 10 if the selected option is correct
        if(selectedOption.dataset.option === correctOption){
            selectedOption.classList.add('correct')
            score += 10
        } else {
            selectedOption.classList.add('incorrect')
        }

        // Updating score UI and display explanation about the current question
        scoreEl.innerText = `Score: ${score}`
        renderExplanation(quizData[currentIndex])
        explanation.style.opacity = '1'

        // Render the next question 10 seconds after the user selects an option
        throttleTimeout = setTimeout(() => {
            throttleTimeout = null
            nextQuestion()
        }, 10000)
    }
}

// Handle updating explanation UI 
function renderExplanation(data) {
    let optionExplanation = data.explanation

    if(optionExplanation !== null){
        explanation.innerText = optionExplanation
    }
}

// Move to the next quiz question
function nextQuestion() {
    // Increasing index by 1
    currentIndex++

    // Check if all questions are complete, then display the finish quiz page
    if(currentIndex >= quizData.length){
        sessionStorage.setItem('score', JSON.stringify(score))
        window.location.assign('finishQuiz.html')
    }

    // Clear previous question UI and updating with the next question
    explanation.innerText = ''
    explanation.style.opacity = '0'
    renderQuiz(currentIndex)
    clearTimeout(throttleTimeout)
    nextButton.style.backgroundColor = "#499d3e";
    throttleTimeout = null
    nextButton.disabled = true
}