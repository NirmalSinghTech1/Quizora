// DOM Elements
const currentQuestion = document.querySelector('.current-question')
const progressBar = document.querySelector('.progress-bar')
const countdownProgressBar = document.querySelector('.countdown-progress-bar')
const timeleft = document.querySelector('.time-left')
const optionsList = document.querySelector('.options-list')
const question = document.querySelector('.question')
const explanation = document.querySelector('.explanation')
const nextButton = document.querySelector('.next-button')

document.addEventListener('click', (e) => {
    e.target.dataset.option && checkOption(e.target.dataset.option)
})


const data = JSON.parse(sessionStorage.getItem('data')) || []
console.log(data)
if(data.length > 0 || data !== null) {
    console.log('length', data.length)
    let currentIndex = 0
    let totalQuestions = data.length

    currentQuestion.innerText = `Question ${currentIndex + 1} of ${totalQuestions}`
    progressBar.style.width = `${currentIndex + 1 / totalQuestions * 100}%`
    // handleCountdown()
    question.innerText = data[currentIndex].question
    renderOptions(data[currentIndex])
    correctAnswer(data[currentIndex])
}


// Handle countdown timer
function handleCountdown() {
    let totalTime = 30;

    const timer = setInterval(() => {
        timeleft.innerText = totalTime
        totalTime--;
        countdownProgressBar.style.width = `${totalTime / 30 * 100}%`
        if(totalTime === 0){
            clearInterval(timer)
            // handleCountdown()
        }
        // console.log(totalTime)
    }, 1000);
    
}

function renderOptions(data) {
    const availableOptions = data.answers
    
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
    console.log("data", data)
    for(let [key, value] of Object.entries(correctAnswer)) {
        if(value === 'true') {
            return key.substring(0, 8)
        }
    }
}

function checkOption(selectedOption) {
    const correctOption = 
    console.log(correctOption)
}