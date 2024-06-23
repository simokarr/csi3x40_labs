document.addEventListener('DOMContentLoaded', () => {
    const diceContainer = document.getElementById('dice-container');
    const rollButton = document.getElementById('roll-button');
    const scoreButton = document.getElementById('score-button');
    const scoreboardBody = document.getElementById('scoreboard-body');
    
    let diceValues = [1, 1, 1, 1, 1];
    let rollsRemaining = 3;
    let score = 0;

    function rollDice() {
        if (rollsRemaining > 0) {
            for (let i = 0; i < diceValues.length; i++) {
                if (!diceContainer.children[i].classList.contains('held')) {
                    diceValues[i] = Math.floor(Math.random() * 6) + 1;
                    diceContainer.children[i].querySelector('img').src = `dice_pictures/${diceValues[i]}.png`;
                }
            }
            rollsRemaining--;
            rollButton.textContent = `Roll Dice (${rollsRemaining} rolls remaining)`;
        }
    }

    function toggleHold(event) {
        if (event.target.closest('.dice')) {
            event.target.closest('.dice').classList.toggle('held');
        }
    }

    function scoreDice() {
        if (rollsRemaining < 3) {
            const turnScore = diceValues.reduce((acc, val) => acc + val, 0);
            score += turnScore;
            const row = document.createElement('tr');
            row.innerHTML = `<td>Turn Score</td><td>${turnScore}</td>`;
            scoreboardBody.appendChild(row);

            diceValues = [1, 1, 1, 1, 1];
            for (let i = 0; i < diceContainer.children.length; i++) {
                diceContainer.children[i].querySelector('img').src = `dice_pictures/1.png`;
                diceContainer.children[i].classList.remove('held');
            }
            rollsRemaining = 3;
            rollButton.textContent = 'Roll Dice';
        }
    }

    rollButton.addEventListener('click', rollDice);
    scoreButton.addEventListener('click', scoreDice);
    diceContainer.addEventListener('click', toggleHold);
});
