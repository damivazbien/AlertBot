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
// inforIf = save your lower value register to buy a house with BTC
let infoIf = 0;


//current price to broke
let btcprice = 34212;
let ethprice = 1032.02;
let adaprice = 0.25305;
let dotprice = 7.62;
let matic = 0.02762691;

let ethsatprice = 0;
let adasatprice = 0;
let dotsatprice = 0;
let maticsatprice = 0;

// your telegram chat id
let chatid = 0;

// TODO: save data to MongoDb

function intervalFunc() {
    console.log("Execute " + execute);
	https.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,polkadot,matic-network&vs_currencies=eur', (resp) => {
        let data = '';
		let btcforhouse = ''; 
		let datasats = '';

        var api = new telegram({
            token: 'YOURTOKENBOT',
        });
          
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
			https.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,polkadot,stasis-eurs,matic-network,tether&vs_currencies=SATS', (resp) => {
                    
                    resp.on('data', (chunk) => {
                        datasats += chunk;
                    });
                    
                    resp.on('end', () => {
                        btcforhouse = 500000 / JSON.parse(data)['bitcoin'].eur;
                        
                        if(infoIf > btcforhouse)
                        {
							ethsatprice = JSON.parse(datasats)['ethereum'].sats;
                            adasatprice = JSON.parse(datasats)['cardano'].sats;
                            dotsatprice = JSON.parse(datasats)['polkadot'].sats;
							maticsatprice = JSON.parse(datasats)['matic-network'].sats;
							
							fs.readFile('./graphpricecomparation.json', 'utf-8', function(err, datajson) {
								if (err) throw err
								
								var arrayOfObjects = JSON.parse(datajson)
								console.log(JSON.parse(datajson))
								const date = Date.now()
			
								arrayOfObjects.ada.push([
									date,
									JSON.parse(data)['cardano'].eur,
									JSON.parse(datasats)['cardano'].sats
								])
								arrayOfObjects.ethereum.push([
									date,
									JSON.parse(data)['ethereum'].eur,
									JSON.parse(datasats)['ethereum'].sats
								])
								arrayOfObjects.bitcoin.push([
									date,
									btcforhouse,
									JSON.parse(data)['bitcoin'].eur,
									(450000 / JSON.parse(data)['bitcoin'].eur).toFixed(2),
									(64490 / JSON.parse(data)['bitcoin'].eur).toFixed(2)

								])
								arrayOfObjects.matic.push([
									date,
									JSON.parse(data)['matic-network'].eur,
									JSON.parse(datasats)['matic-network'].sats
								])
								arrayOfObjects.polkadot.push([
									date,
									JSON.parse(data)['polkadot'].eur,
									JSON.parse(datasats)['polkadot'].sats
								])
			
								fs.writeFile('./graphpricecomparation.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
									if (err) throw err
									console.log('Done!')
								})
							});
                            //const classes = `header ${ isLargeScreen() ? '' : (item.isCollapsed ? 'icon-expander' : 'icon-collapser') }`;
                            var message =     "LOVE YOU ALL! \uD83D\uDE00! \n \n"
                                            + "Current price (EUR) BTC ** " + JSON.parse(data)['bitcoin'].eur + " ** \uD83D\uDE80 \n" 
                                            + " -------------ALTS--PRICE---------- \n"
                                            + " ETH "       + JSON.parse(data)['ethereum'].eur + `${ ethprice < JSON.parse(data)['ethereum'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }` 
                                            + " ADA "       + JSON.parse(data)['cardano'].eur + `${ adaprice < JSON.parse(data)['cardano'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }` 
                                            + " Polkadot "  + JSON.parse(data)['polkadot'].eur + `${ dotprice < JSON.parse(data)['polkadot'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }` 
                                            + " Matic "     + JSON.parse(data)['matic-network'].eur + `${ matic < JSON.parse(data)['matic-network'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }` 
                                            + " ------------ALTS-TO-SATOSHIS------------- \n"
                                            + " ETH "       + JSON.parse(datasats)['ethereum'].sats +      `${ ethsatprice < JSON.parse(data)['ethereum'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }`
                                            + " ADA "       + JSON.parse(datasats)['cardano'].sats +       `${ adasatprice < JSON.parse(data)['ethereum'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }`
                                            + " Polkadot "  + JSON.parse(datasats)['polkadot'].sats +      `${ dotsatprice < JSON.parse(data)['ethereum'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }`
                                            + " Matic "     + JSON.parse(datasats)['matic-network'].sats + `${ maticsatprice < JSON.parse(data)['ethereum'].eur ? ' \uD83D\uDCC8 \n' : ' \uD83D\uDCC9 \n' }`
                                            + "------------SAT-TO-FIAT--"+"\uD83D\uDCA9"+"--------- \n"
                                            + " USD "       + JSON.parse(datasats)['tether'].sats      + " \uD83D\uDCC9 \n" 
                                            + " EUR "       + JSON.parse(datasats)['stasis-eurs'].sats + " \uD83D\uDCC9 \n" 
                                            + " ------------A-HOUSE-OF-500K-EUROS------------------ \n"
                                            + (500000 / JSON.parse(data)['bitcoin'].eur).toFixed(2) +   " BTC "  + " \uD83C\uDFE1 \n" 
                                            + " ------------A-TESLA-PERFORMANCE-------------------- \n"
                                            + (64490 / JSON.parse(data)['bitcoin'].eur).toFixed(2) +   " BTC "  + " \uD83C\uDFCE \n";
                            
							api.sendMessage({
								chat_id: chatid,
								text: messageprice
							})
							.then(function(data)
							{
								//console.log(util.inspect(data, false, null));
							});
							api.sendDocument(
							{
								chat_id: chatid,
								document: linegif[Math.floor(Math.random()*55)]
							});

                        // update price
						infoIf = btcforhouse;
						// reset count of bot activate
						execute = 0;
					}
					else
					{
						execute = execute + 1;
					}
					if (execute >= 150)
					{
						let message = "Yo!, I love you all \uD83D\uDE00! \n \nI will appear each time that Bitcoin do a new ALL TIME HIGH and decrease the amount of BTC to buy a house " + "\uD83D\uDE80 \n" + "\n"
						+ " Me as a BOT have the mission to help you Human" + " \uD83D\uDE80 \n" + "\n"
						+ " I'm not here to kill John Conor, I'm here to save you all from Skynet (inflation) " + "  \uD83D\uDE80 \n" + "\n"
						+ " Remember always to enjoy your free time and be focus on build a better society with freedom and respect!, BTC will continue pumping at least till year 2140 \n"
						+ "\n"
						+ " BTW I will add new feactures soon as Charts, comparation, news, memes, Widows and love. You must rock!";
						api.sendMessage({
							chat_id: chatid,
							text: message
						})
						.then(function(data)
						{
							//console.log(util.inspect(data, false, null));
						});
						api.sendDocument(
							{
									chat_id: chatid,
									document: linegif[Math.floor(Math.random()*55)]
							});
				
						//reset count
						execute = 0;
					}

                    });
                });
        }).on("error", (err) => {
            console.log("Error: " + err.message)
        });
    
    })
    console.log("how many btc need " + infoIf);
}

setInterval(intervalFunc, 1750000);





