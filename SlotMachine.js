const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

function spinRow() {
    let symbols = ['🌟', '🔔', '🍋', '🌸'];
    let result = [];
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * symbols.length);
        result.push(symbols[randomIndex]);
    }
    return result;
}

function printRow(row) {
    console.log('*************');
    console.log(row.join(' | '));
    console.log('*************');
}

function getPayout(row, bet) {
    if (row[0] === row[1] && row[1] === row[2]) {
        if (row[0] === '🍋') {
            return bet * 2;
        } else if (row[0] === '🌸') {
            return bet * 3;
        } else if (row[0] === '🔔') {
            return bet * 6;
        } else {
            return bet * 10;
        }
    }
    return 0;
}

(async function () {
    console.log('*********************');
    console.log("Welcome to JS's Slots");
    console.log('*********************');

    var balance = 1000;
    var bet;
    var payout;
    let row;
    let playAgain;
    while (balance > 0) {
        console.log("Your Current Balance: $ " + balance);
        bet = parseInt(await promptUser("Enter your bet amount:"));
        if (bet > balance) {
            console.log("Insufficient Balance");
            continue;
        }
        if (isNaN(bet) || bet <= 0) {
            console.log("Invalid Entry");
            continue;
        }
        balance -= bet;

        row = spinRow();
        console.log("Spinning...");
        printRow(row);

        payout = getPayout(row, bet);
        if (payout > 0) {
            balance += payout;
            console.log("You won $" + payout);
        } else {
            console.log("Sorry you lost");
        }
        playAgain = (await promptUser("Do you want another spin? (Y/N): ")).toUpperCase();
        
        if (playAgain !== 'Y') {
            break;
        }
    }
    console.log('******************');
    console.log("Thanks For Playing");
    console.log('******************');
    rl.close();
})();