const venom = require('venom-bot');

const targetGroupId = '120363043035155290@g.us';

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
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