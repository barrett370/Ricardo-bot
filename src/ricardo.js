const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
;
const dad_joke_options = {
    hostname: 'icanhazdadjoke.com',
    port: "443",
    path: '/',
    headers: {
        'Accept': 'application/json'
    }
};
let ricardo_blacklist = new Map();
const https = require('https');
client.on('message', msg => {
    let pref;
    if (msg.content.substring(0, 1) === '!') {
        let args = msg.content.substring(1).split(' ');
        let cmd = args[0];
        if (ricardo_blacklist.get(msg.author.username) !== undefined && ricardo_blacklist.get(msg.author.username) > (Date.now() - (24 * 60 * 60 * 1000))) {
            msg.reply("Fuck off").then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
        } else {
            case_response(cmd, msg);
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
        msg.reply(reply).then(() => {
            //pass
        }, function (err) {
            console.log(err);
        });
    }
});

function case_response(cmd, msg) {
    switch (cmd) {

        case 'ping':
            msg.reply("pong!").then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'bloomberg':
            msg.reply("bloooooombeeerrg").then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'vibecheck':

            msg.reply("Initialising Vibe Check").then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
            // console.log(client.users);
            // iterator = client.users.values();

            // client.channels.get(msg.channel.id).users.forEach(vibe_check, msg);
            // msg.channel.
            client.users.forEach(vibe_check, msg);

            break;

        case 'bigbrain':
            msg.reply({
                files:
                    ["./resources/bigbrain.gif"]

            }).then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'dad':
            let req = https.get(dad_joke_options, res => {

                console.log(`statusCode: ${res.statusCode}`);

                res.on('data', d => {
                    let jsonContent = JSON.parse(d);
                    msg.reply(jsonContent.joke).then(() => {
                        //pass
                    }, function (err) {
                        console.log(err);
                    });
                    process.stdout.write(d)
                });

                req.on('error', error => {
                    console.error(error);
                    msg.reply("piss off").then(() => {
                        //pass
                    }, function (err) {
                        console.log(err);
                    });
                });

                req.end();
            });
            break;
        case 'ricardo':
            msg.reply({
                files:
                    ["./resources/ricardo.gif"]
            }).then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
    }

}


function vibe_check(value) {
    this.reply("Checking " + value.username + "'s vibes").then(() => {
        //pass
    }, function (err) {
        console.log(err);
    });
    this.reply(".............").then(() => {
        //pass
    }, function (err) {
        console.log(err);
    });
    this.reply("..................................").then(() => {
        //pass
    }, function (err) {
        console.log(err);
    });
    this.reply("........................................................").then(() => {
        //pass
    }, function (err) {
        console.log(err);
    });
    const min = 1;
    const max = 10;
    let random =
        Math.floor(Math.random() * (+max - +min)) + +min;
    if (random === 1) {
        this.reply("FAILED!, " + value.username + " has bad vibes, you have lost ricardo privileges for 24hrs ").then(() => {
            //pass
        }, function (err) {
            console.log(err);
        });

        ricardo_blacklist.set(value.username, Date.now());
    } else {
        this.reply("PASSED").then(() => {
            //pass
        }, function (err) {
            console.log(err);
        });
    }
}


client.login(auth.token).then(() => client.user.setAvatar('./resources/avatar.jpg'));


process.on('SIGINT', function () {
    process.exit();
});