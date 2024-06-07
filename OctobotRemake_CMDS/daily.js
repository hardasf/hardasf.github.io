const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'daily',
    description: 'Receive a random amount of coins (50 - 100) once per day.',
    coins: 0,
    role: "user",
    cooldown: 86400, // 24 hours in seconds
    execute(api, event, args, command) {
        const userId = event.senderID;
        const dailyFile = path.join(__dirname, `../database/daily/${userId}.json`);
        const coinBalanceFile = path.join(__dirname, `../database/coin_balances/${userId}.json`);
        const now = new Date();

        if (fs.existsSync(dailyFile)) {
            const lastClaimed = new Date(JSON.parse(fs.readFileSync(dailyFile, 'utf8')).lastClaimed);
            const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            if ((now - lastClaimed) < oneDay) {
                const nextClaim = new Date(lastClaimed.getTime() + oneDay);
                const timeLeft = nextClaim - now;
                const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                api.sendMessage(`You have already claimed your daily coins. Try again in ${hoursLeft} hours and ${minutesLeft} minutes.`, event.threadID, event.messageID);
                return;
            }
        }

        const randomCoins = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

        let coinBalance = 0;
        if (fs.existsSync(coinBalanceFile)) {
            coinBalance = JSON.parse(fs.readFileSync(coinBalanceFile, 'utf8'));
        }
        coinBalance += randomCoins;

        fs.writeFileSync(coinBalanceFile, JSON.stringify(coinBalance));
        fs.writeFileSync(dailyFile, JSON.stringify({ lastClaimed: now }));

        api.sendMessage(`You have received ${randomCoins} coins! You now have ${coinBalance} coins.`, event.threadID, event.messageID);
    }
};
