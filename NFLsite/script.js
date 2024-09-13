const scoresContainer = document.getElementById('scores-container');

async function fetchNFLScores() {
    try {
        const response = await fetch('https://www.api-football.com/45019a96484e81bdcfd61be6807b711f');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching NFL scores:', error);
    }
}

function displayScores(scores) {
    scoresContainer.innerHTML = '';
    scores.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <div class="team">
                <span>${game.homeTeam}</span>
                <span class="score">${game.homeScore}</span>
            </div>
            <div class="team">
                <span>${game.awayTeam}</span>
                <span class="score">${game.awayScore}</span>
            </div>
            <div>Quarter: ${game.quarter}</div>
            <div>Time Remaining: ${game.timeRemaining}</div>
        `;
        scoresContainer.appendChild(gameCard);
    });
}

async function updateScores() {
    const scores = await fetchNFLScores();
    displayScores(scores);
}

// Update scores every 30 seconds
setInterval(updateScores, 30000);

// Initial update
updateScores();