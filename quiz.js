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

document.addEventListener('click', (e) => {
    e.target.dataset.option && checkOption(e.target)
})

nextButton.addEventListener('click', () => {
    nextQuestion()
})

const quizData = JSON.parse(sessionStorage.getItem('data')) || []
let currentIndex = 8
let score = 0
let timerId

console.log(quizData)
function renderQuiz(index) {
    if(quizData.length > 0 || quizData !== null) {
        console.log('length', quizData.length)
        let totalQuestions = quizData.length
    
        currentQuestion.innerText = `Question ${index + 1} of ${totalQuestions}`
        progressBar.style.width = `${(index + 1) / totalQuestions * 100}%`
        // console.log(progressBar)
        // handleCountdown()
        // explanation.innerText = quizData[index].explanation

        // console.log(quizData[index].explanation)
        renderOptions(quizData[index])
        
        correctAnswer(quizData[index])
    }
}
renderQuiz(currentIndex)


// Handle countdown timer
function handleCountdown() {
    let totalTime = 30;

    if(timerId){
        clearInterval(timerId)
    }
    
    timerId = setInterval(() => {
        console.log("timer", timerId)
        timeleft.innerText = totalTime
        countdownProgressBar.style.width = `${totalTime / 30 * 100}%`
        if(totalTime <= 0){
            clearInterval(timerId)
            nextQuestion()
        }
        // console.log(totalTime)
        totalTime--;
    }, 1000);
    
}

function renderOptions(data) {
    const availableOptions = data.answers
    
    question.innerText = data.question
    optionsList.innerText = ''
    // console.log(availableOptions)
    for(let [key, value] of Object.entries(availableOptions)) {
        if(value !== null) {
            const li = document.createElement('li')
            li.setAttribute('data-option', `${key}`)
            li.innerText = value
            optionsList.appendChild(li) 
        }
    }
}

function correctAnswer(data) {
    const correctAnswer = data.correct_answers
    // console.log("data", data)
    for(let [key, value] of Object.entries(correctAnswer)) {
        if(value === 'true') {
            return key.substring(0, 8)
        }
    }
}

let throttleTimeout = null
function checkOption(selectedOption) {
    if(throttleTimeout !== null) return;
    const correctOption = correctAnswer(quizData[currentIndex])
    nextButton.disabled = false

    if(throttleTimeout === null){
        if(selectedOption.dataset.option === correctOption){
            selectedOption.classList.add('correct')
            score += 10
        } else {
            selectedOption.classList.add('incorrect')
        }
        scoreEl.innerText = `Score: ${score}`
        renderExplanation(quizData[currentIndex])
        explanation.style.opacity = '1'

        throttleTimeout = setTimeout(() => {
            throttleTimeout = null
            nextQuestion()
        }, 10000)
    }
}

// render explanation
function renderExplanation(data) {
    let optionExplanation = data.explanation

    if(optionExplanation !== null){
        explanation.innerText = optionExplanation
    }
}

function nextQuestion() {
    currentIndex++

    if(currentIndex >= quizData.length){
        sessionStorage.setItem('score', JSON.stringify(score))
        window.location.assign('finishQuiz.html')
    }

    explanation.innerText = ''
    explanation.style.opacity = '0'
    renderQuiz(currentIndex)
    clearTimeout(throttleTimeout)
    nextButton.style.backgroundColor = "#499d3e";
    throttleTimeout = null
    nextButton.disabled = true

}