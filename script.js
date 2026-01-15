import { sitcomData } from './data.js';


let state = {
    series: null,
    mood: null
};


const screens = {
    landing: document.querySelector('#landing-screen'),
    mood: document.querySelector('#mood-screen'),
    loading: document.querySelector('#loading-screen'),
    result: document.querySelector('#result-screen')
};


function navigateTo(screenName) {

    Object.values(screens).forEach(el => {
        el.classList.remove('active');
        setTimeout(() => {
            if(!el.classList.contains('active')) el.style.display = 'none';
        }, 500); 
    });


    const target = screens[screenName];
    target.style.display = 'flex';

    setTimeout(() => target.classList.add('active'), 50);
}


document.querySelectorAll('.series-card').forEach(card => {
    card.addEventListener('click', () => {
        const series = card.dataset.series;
        state.series = series;
        console.log(`Selected Series: ${series}`);
        navigateTo('mood');
    });
});


document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const mood = btn.dataset.mood;
        state.mood = mood;
        console.log(`Selected Mood: ${mood}`);
        
        navigateTo('loading');
        

        setTimeout(() => {
            generateSuggestion();
            navigateTo('result');
        }, 1500);
    });
});


function generateSuggestion() {
    const seriesData = sitcomData[state.series];
    if (!seriesData) return;


    const episodes = seriesData[state.mood] || seriesData['Happy'];
    

    const randomEp = episodes[Math.floor(Math.random() * episodes.length)];


    document.getElementById('result-series').textContent = state.series;
    document.getElementById('result-title').textContent = randomEp.title;
    document.getElementById('result-meta').textContent = `Season ${randomEp.season} • Episode ${randomEp.episode}`;
    

    document.getElementById('result-reason').textContent = randomEp.specific_reason;
}


document.getElementById('retry-btn').addEventListener('click', () => {
    navigateTo('landing');
    state = { series: null, mood: null };
});


document.getElementById('same-mood-btn').addEventListener('click', () => {
    // Optional: Add a small loading state or rotation here if desired
    generateSuggestion();
});

document.getElementById('new-mood-btn').addEventListener('click', () => {
    navigateTo('mood');
});



screens.landing.classList.add('active');
screens.landing.style.display = 'flex';
