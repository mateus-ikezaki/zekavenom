const venom = require('venom-bot');
const venomOptions = require('./venom-options.js')
//const puppeteer = require('puppeteer')

const targetGroupId = '120363043035155290@g.us';
/*
(async () => {
    console.log("Launching Puppeteer...");
    
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log("Puppeteer Launched!");
})();

venom
  .create({
    session: 'session-name',
    multidevice: true
  })
  .then((client) => {
        start(client);
        client.sendText(targetGroupId, 'We are Venom');
        console.log("Client ready!");
    })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === true) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); 
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro);
        });
    }
  });
  client.onAnyMessage((message) => {
    console.log(message)
    console.log(message.chat.id)
    if(message.chatId == targetGroupId && message.body == 'ping') {
        client.reply(message.chatId, 'pong', message.id);
    }
  })
}*/


//const venom = require('venom-bot')

const TWENTY_MINUTES = 1200000
let client = null

dateLog('Started index.js')
initBot()

function initBot() {
	dateLog('Initializing bot')
	venom
		//	create bot with options
		.create(venomOptions)
		// 	start bot
		.then((client) => {
      startBot(client)
      client.sendText(targetGroupId, 'We are Venom');
    })
		// 	catch errors
		.catch((err) => {
			dateLog(err)
		})
}

function startBot(_client) {
	dateLog('Starting bot')
	client = _client
  client.send
	//	restart bot every 20 minutos
	//	stops working otherwise
	setTimeout(() => {
		//	close bot
		client.close()
		dateLog('Closing bot')

		//	init bot again
		initBot()
	}, TWENTY_MINUTES)

	//
	// add your code here
	//

	// example: reply every message with "Hi!""
	client.onAnyMessage(capture)
}

function capture(message) {
	const sender = message.from
	dateLog(`Message received from: ${sender}`);
	dateLog(`Message: "${message.body}"`);
}

//
//	Aux
//

// Catch ctrl+C
process.on('SIGINT', function () {
	client.close()
})

function dateLog(text) {
	console.log(new Date(), ' - ', text)
}