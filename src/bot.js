const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
;
client.on('message', msg => {
    switch (msg.content) {
        case 'ping':
            msg.reply("pong");
            break;
        case 'bloomberg':
            msg.reply("bloooooombeeerrg");
            break;
    }
});




client.login(auth.token);