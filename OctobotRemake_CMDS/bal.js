const fs = require('fs');
const path = require('path');

module.exports = {
    role: 'user',
    description: 'Check your coin balance.',
    coins: 0,
    cooldown: 0, 
    execute(api, event, args, command) {
        const userId = event.senderID;
        const coinBalanceFile = path.join(__dirname, `../database/coin_balances/${userId}.json`);

        let coinBalance = 0;
        if (fs.existsSync(coinBalanceFile)) {
            coinBalance = JSON.parse(fs.readFileSync(coinBalanceFile, 'utf8'));
        }

        api.sendMessage(`You have ${coinBalance} coins.`, event.threadID, event.messageID);
    }
};
