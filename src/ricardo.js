const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
;
client.on('message', msg => {
        let pref;
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
        if (((msg.content.toLowerCase().includes("i'm")) || (msg.content.toLowerCase().includes("i am"))) && msg.author.tag !== client.user.tag) {

            let message = msg.content.toLowerCase()
            if ((message.includes("i'm"))) {
                pref = "i'm";
            } else {
                pref = "i am";
            }

            let iam = message.split(pref);

            iam = iam[1]

            if (iam.includes(".")) {
                iam = iam.split(".")[0]
            }else if (iam.includes(",")) {
                iam = iam.split(",")[0]
            }
            let reply = "Hi" + iam + ", I'm Dad!"
            msg.reply(reply)
        }
    }
);


client.login(auth.token);