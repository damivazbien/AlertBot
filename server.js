const https = require('https');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = tokenAddress;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


function intervalFunc() {
    https.get('https://blockchain.info/ticker', (resp) => {
    let data = '';
          
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
      
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
            const chatId = chatid;

            // stringify JSON Object
            var jsonContent = JSON.stringify(JSON.parse(data)['EUR']);
            console.log(jsonContent);

            // append data to file
            fs.appendFileSync('pricebtceur.txt',jsonContent, 'utf8',
              // callback function
              function(err) { 
                  if (err) throw err;
                  // if no error
                  console.log("Data is appended to file successfully.")
              }); 
            });

            // send a message to the chat acknowledging receipt of their message
            bot.sendMessage(chatId, JSON.parse(data)['EUR'].buy);
      
      }).on("error", (err) => {
        console.log("Error: " + err.message)});
  }
  
  setInterval(intervalFunc,  3000);

