const { match } = require('assert');
const https = require('https');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOURTOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/report (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const respw = match[1].split(' '); // the captured "whatever"
    https.get('https://api.coingecko.com/api/v3/simple/price?ids=' + `${ respw[0] }`+ '&vs_currencies=eur,usd', (resp) => {
        let data = '';
		let btcforhouse = ''; 
        let datasats = '';
        let currentpriceeur = '';
        let currentpriceusd = '';
        let oldprice = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
                                
                                try {
                                    
                                    currentpriceeur = JSON.parse(data)[respw[0]].eur;
                                    currentpriceusd = JSON.parse(data)[respw[0]].usd;
                                                   

                                    https.get('https://api.coingecko.com/api/v3/coins/' + `${ respw[0] }` + '/history?date=' + `${ respw[1] }`, (resp) => {
                                        let data2 = '';
                                        
                                        // A chunk of data has been recieved.
                                        resp.on('data', (chunk) => {
                                            data2 += chunk;
                                        });

                                        // The whole response has been received. Print out the result.
                                        resp.on('end', () => {
                                                      
                                            try {
                                                    oldpriceeur = (JSON.parse(data2)["market_data"]["current_price"].eur).toFixed(2);
                                                    oldpriceusd = (JSON.parse(data2)["market_data"]["current_price"].usd).toFixed(2);

                                                    fs.writeFile('./price.json', JSON.stringify(JSON.parse(data2)), 'utf-8', function(err) {
                                                        if (err) throw err
                                                        console.log('Done!')
                                                    })


                                                    console.log(JSON.parse(data2));
                                                    // send back the matched "whatever" to the chat
                                                    bot.sendMessage(chatId, "the price of " + respw[0] + " on " + respw[1] + " € " + oldpriceeur + "/ $ " + oldpriceusd  + " now is € " + currentpriceeur + "/ $" + currentpriceusd );
                                                    bot.sendMessage(chatId, "the price of " + respw[0] + " on " + respw[1] + " € " + oldpriceeur + "/ $ " + oldpriceusd  + " now is € " + currentpriceeur + "/ $" + currentpriceusd );
                                                }
                                                catch (e) {
                                                    bot.sendMessage(chatId, "I don't that coin, mmm, just stack sat. bye");
                                                }

                                        });

                                        }).on("error", (err) => {
                                            bot.sendMessage(chatId, "I don't know shit, mmm, just stack sat. bye");
                                        });
                                }
                                catch (e) {
                                    bot.sendMessage(chatId, "I don't that coin, mmm, just stack sat. bye");
                                }

                            });

    }).on("error", (err) => {
        bot.sendMessage(chatId, "I don't know shit, mmm, just stack sat. bye");
    });

});

// Matches "/echo [whatever]"
bot.onText(/\/messageforme (.+)/, (msg, match) => {
    bot.sendMessage(chatId, "Avoid save your money in any Fiat currency or any evolution of Fiat (CBDC). Be smart use Open-source. Your sexy bot, peace");
})

// Matches "/echo [whatever]"
bot.onText(/\/getprice (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const respw = match[1]; // the captured "whatever"
    
    https.get('https://api.coingecko.com/api/v3/simple/price?ids=' + `${ respw }`+ '&vs_currencies=eur', (resp) => {
        let data = '';
		let btcforhouse = ''; 
        let datasats = '';
        
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
                                
                                try {
                                    // send back the matched "whatever" to the chat
                                    bot.sendMessage(chatId, "the price of " + respw + " is " + JSON.parse(data)[respw].eur);
                                }
                                catch (e) {
                                    bot.sendMessage(chatId, "I don't that coin, mmm, just stack sat. bye");
                                  }

                            });

    }).on("error", (err) => {
        bot.sendMessage(chatId, "I don't know shit, mmm, just stack sat. bye");
    });

  });


// Matches "/echo [whatever]"
bot.onText(/\/gethouseprice (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const respw = match[1]; // the captured "whatever"
    
    https.get('https://api.coingecko.com/api/v3/simple/price?ids=' + `${ respw }`+ '&vs_currencies=eur', (resp) => {
        let data = '';
		let btcforhouse = ''; 
        let datasats = '';
        
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
                                
                                try {
                                    // send back the matched "whatever" to the chat
                                    bot.sendMessage(chatId, "to buy a house of 500 k euros you need " + respw + " is " +  500000 / JSON.parse(data)[respw].eur);

                                    bot.sendMessage(chatId, "but rememember, the best purchaise is when you work to earn it!");
                                }
                                catch (e) {
                                    bot.sendMessage(chatId, "I don't that coin, mmm, just stack sat. bye");
                                  }

                            });

    }).on("error", (err) => {
        bot.sendMessage(chatId, "I don't know shit, mmm, just stack sat. bye");
    });

});
  
