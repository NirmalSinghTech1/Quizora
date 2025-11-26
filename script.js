// DOM Elements
const playButton = document.querySelector('.play-button')


const API_KEY = 'kXGD5sYiLGtSQIZBQPrpJigZsYgkGqKWJuzapsZ2';

playButton.addEventListener('click', async () => {
    try {
        const res = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&difficulty=Easy&limit=10&tags=JavaScript`)
        const data = await res.json()
        console.log(data)

        sessionStorage.setItem('data', JSON.stringify(data))
        window.location.assign('quiz.html')
    } catch(err) {
        console.log(err)
    }
})

