const venom = require('venom-bot');
const puppeteer = require('puppeteer')

const targetGroupId = '120363043035155290@g.us';

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
}