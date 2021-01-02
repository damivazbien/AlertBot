const https = require('https');
const fs = require('fs');
var telegram = require('telegram-bot-api');
// read contents of the file
const datafile = fs.readFileSync('.secret', 'UTF-8');
const datagif = fs.readFileSync('.secretgif', 'UTF-8');
// split the contents by new line
const lines = datafile.split(/\r?\n/);
const linegif = datagif.split(/\r?\n/);
// replace the value below with the Telegram token you receive from @BotFather
const token = lines[1];
const chatid = lines[3];
let execute = 0;

function intervalFunc() {
    if (execute == 1){
        https.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur', (resp) => {
            let data = '';

            let btcforhouse = ''; 

            var api = new telegram({
                token: token,
            });
          
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
        
        
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                btcforhouse = 450000 / JSON.parse(data)['bitcoin'].eur;
            
                api.sendMessage({
                    chat_id: chatid,
                    text: "Love you fox \uD83D\uDE00! \n \nCurrent BTC price is " + JSON.parse(data)['bitcoin'].eur + ' \uD83D\uDE80 you will need to have ' + (btcforhouse).toFixed(2) + ' BTC to buy a House \uD83C\uDFE0 of 450 k Eur',  
                })
                .then(function(data)
                {
                //console.log(util.inspect(data, false, null));
                });
            api.sendDocument(
                {
                    chat_id: chatid,
                    document: linegif[Math.floor(Math.random()*9)]
                }
            )

            api.sendMessage({
                chat_id: chatid,
                text: "Love you fox \uD83D\uDE00! \n \nCurrent BTC price is " + JSON.parse(data)['bitcoin'].eur + ' \uD83D\uDE80 you will need to have ' + (btcforhouse).toFixed(2) + ' BTC to buy a House \uD83C\uDFE0 of 450 k Eur',  
            })
            .then(function(data)
            {
                //console.log(util.inspect(data, false, null));
            });
            api.sendDocument(
                {
                    chat_id: chatid,
                    document: linegif[Math.floor(Math.random()*9)]
                }
            )

            api.sendMessage({
                chat_id: chatid,
                text: "Love you fox \uD83D\uDE00! \n \nCurrent BTC price is " + JSON.parse(data)['bitcoin'].eur + ' \uD83D\uDE80 you will need to have ' + (btcforhouse).toFixed(2) + ' BTC to buy a House \uD83C\uDFE0 of 450 k Eur',  
            })
            .then(function(data)
            {
                //console.log(util.inspect(data, false, null));
            });
            api.sendDocument(
                {
                    chat_id: chatid,
                    document: linegif[Math.floor(Math.random()*9)]
                }
            )
      
        }).on("error", (err) => {
            console.log("Error: " + err.message)
        });
    
    })
    }
    else
    {
        execute = 1;
    }  
}


setInterval(intervalFunc, 380000000);





