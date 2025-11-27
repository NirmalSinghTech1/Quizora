// DOM Elements
const playButton = document.querySelector('.play-button')

const API_KEY = 'kXGD5sYiLGtSQIZBQPrpJigZsYgkGqKWJuzapsZ2';

// Handle API call and start quiz
playButton.addEventListener('click', async () => {
    try {
        const res = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&difficulty=Easy&limit=10&tags=react`)
        const data = await res.json()

        // storing quiz data from API call to session storage
        sessionStorage.setItem('data', JSON.stringify(data))
        window.location.assign('quiz.html')
    } catch(err) {
        console.error(err)
    }
})

