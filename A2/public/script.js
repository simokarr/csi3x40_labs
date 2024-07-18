document.addEventListener('DOMContentLoaded', () => {
    const diceContainer = document.getElementById('dice-container');
    const rollButton = document.getElementById('roll-button');
    const scoreButton = document.getElementById('score-button');
    const scoreboardBody = document.getElementById('scoreboard-body');
    const categoryButtons = document.querySelectorAll('.category-button');

    let diceValues = [1, 1, 1, 1, 1];
    let rollsRemaining = 3;
    let score = 0;
    let selectedCategory = null;

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

    function calculateThreeOfAKind(diceValues) {
        const counts = {};
        diceValues.forEach(val => counts[val] = (counts[val] || 0) + 1);
        for (let val in counts) {
            if (counts[val] >= 3) {
                return diceValues.reduce((acc, val) => acc + val, 0);
            }
        }
        return 0;
    }

    function calculateFourOfAKind(diceValues) {
        const counts = {};
        diceValues.forEach(val => counts[val] = (counts[val] || 0) + 1);
        for (let val in counts) {
            if (counts[val] >= 4) {
                return diceValues.reduce((acc, val) => acc + val, 0);
            }
        }
        return 0;
    }

    function calculateFullHouse(diceValues) {
        const counts = {};
        diceValues.forEach(val => counts[val] = (counts[val] || 0) + 1);
        const values = Object.values(counts);
        if (values.includes(3) && values.includes(2)) {
            return 25;
        }
        return 0;
    }

    function calculateSmallStraight(diceValues) {
        const straights = [
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [3, 4, 5, 6]
        ];
        for (let straight of straights) {
            if (straight.every(val => diceValues.includes(val))) {
                return 30;
            }
        }
        return 0;
    }

    function calculateLargeStraight(diceValues) {
        const straights = [
            [1, 2, 3, 4, 5],
            [2, 3, 4, 5, 6]
        ];
        for (let straight of straights) {
            if (straight.every(val => diceValues.includes(val))) {
                return 40;
            }
        }
        return 0;
    }

    function calculateYahtzee(diceValues) {
        if (diceValues.every(val => val === diceValues[0])) {
            return 50;
        }
        return 0;
    }

    function calculateChance(diceValues) {
        return diceValues.reduce((acc, val) => acc + val, 0);
    }

    function scoreDice() {
        if (rollsRemaining < 3 && selectedCategory) {
            let turnScore = 0;
            switch (selectedCategory) {
                case 'threeOfAKind':
                    turnScore = calculateThreeOfAKind(diceValues);
                    break;
                case 'fourOfAKind':
                    turnScore = calculateFourOfAKind(diceValues);
                    break;
                case 'fullHouse':
                    turnScore = calculateFullHouse(diceValues);
                    break;
                case 'smallStraight':
                    turnScore = calculateSmallStraight(diceValues);
                    break;
                case 'largeStraight':
                    turnScore = calculateLargeStraight(diceValues);
                    break;
                case 'yahtzee':
                    turnScore = calculateYahtzee(diceValues);
                    break;
                case 'chance':
                    turnScore = calculateChance(diceValues);
                    break;
            }
            score += turnScore;
            const row = document.createElement('tr');
            row.innerHTML = `<td>${selectedCategory}</td><td>${turnScore}</td>`;
            scoreboardBody.appendChild(row);

            diceValues = [1, 1, 1, 1, 1];
            for (let i = 0; i < diceContainer.children.length; i++) {
                diceContainer.children[i].querySelector('img').src = `dice_pictures/1.png`;
                diceContainer.children[i].classList.remove('held');
            }
            rollsRemaining = 3;
            rollButton.textContent = 'Roll Dice';
            selectedCategory = null; // Reset the selected category
        }
    }

    function selectCategory(event) {
        selectedCategory = event.target.dataset.category;
        scoreButton.disabled = false;
    }

    rollButton.addEventListener('click', rollDice);
    scoreButton.addEventListener('click', scoreDice);
    diceContainer.addEventListener('click', toggleHold);
    categoryButtons.forEach(button => button.addEventListener('click', selectCategory));
});
