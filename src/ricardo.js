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
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];

        switch (cmd) {
            case 'ping':
                msg.reply("pong").then(r => {
                    //pass
                }, function(err) {
                    console.log(err);
                });
                break;
            case 'bloomberg':
                msg.reply("bloooooombeeerrg").then(r => {
                    //pass
                }, function(err) {
                    console.log(err);
                });
                break;
            case 'bigbrain':
                msg.reply({
                    files:
                        ["./resources/bigbrain.gif"]
                }).then(r => {
                    //pass
                }, function(err) {
                    console.log(err);
                });
                break;
            case 'dad':
                const https = require('https');
                const options = {
                    hostname: 'icanhazdadjoke.com',
                    port: "443",
                    path: '/',
                    headers: {
                        'Accept': 'application/json'
                    }
                };

                const req = https.get(options, res => {
                    console.log(`statusCode: ${res.statusCode}`);

                    res.on('data', d => {
                        let jsonContent = JSON.parse(d);
                        msg.reply(jsonContent.joke).then(r => {
                            //pass
                        }, function(err) {
                            console.log(err);
                        });
                        process.stdout.write(d)
                    });

                    req.on('error', error => {
                        console.error(error);
                        msg.reply("piss off").then(r => {
                            //pass
                        }, function(err) {
                            console.log(err);
                        });
                    });

                    req.end()


                });

        }
        if (msg.content.toLowerCase().includes("ricardo")) {
            msg.reply({
                files:
                    ["./resources/ricardo.gif"]
            }).then(r => {
                //pass
            }, function(err) {
                console.log(err);
            });
        }
    }
    if (((msg.content.toLowerCase().includes("i'm")) || (msg.content.toLowerCase().includes("i am"))) && msg.author.tag !== client.user.tag) {

        let message = msg.content.toLowerCase();
        if ((message.includes("i'm"))) {
            pref = "i'm";
        } else {
            pref = "i am";
        }

        let iam = message.split(pref);

        iam = iam[1];

        if (iam.includes(".")) {
            iam = iam.split(".")[0]
        } else if (iam.includes(",")) {
            iam = iam.split(",")[0]
        }
        let determinants = ['the', 'a', 'an'];
        for (let i = 0; i < determinants.length; i++) {
            iam = iam.replace(new RegExp("\\b" + determinants[i] + "\\b"), '')
        }
        let reply = "Hi" + iam + ", I'm Dad!";
        msg.reply(reply).then(r =>
        {
            //pass
        }, function(err) {
            console.log(err);
        });
    }
});


client.login(auth.token).then(() => client.user.setAvatar('./resources/avatar.jpg'));


process.on('SIGINT', function() {
    process.exit();
});