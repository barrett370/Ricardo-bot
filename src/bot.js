const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
;
client.on('message', msg => {
        if (msg.content.substring(0, 1) === '!') {
            var args = msg.content.substring(1).split(' ');
            var cmd = args[0];

            switch (cmd) {
                case 'ping':
                    msg.reply("pong");
                    break;
                case 'bloomberg':
                    msg.reply("bloooooombeeerrg");
                    break;
                case 'bigbrain':
                    msg.reply({
                        files:
                            ["./resources/bigbrain.gif"]
                    });
                    break;
            }
        }
    }
);


client.login(auth.token);