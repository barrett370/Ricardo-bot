import {
    Discord,
    On,
    Client
} from "@typeit/discord"

import {
    Message,
} from "discord.js"

// import auth = require('./auth.json');
import * as auth from "./auth.json"

let ricardo_blacklist: Map<string, number> = new Map();
// import https = require('https');
import * as https from "https"

const dad_joke_options = {
    hostname: 'icanhazdadjoke.com',
    port: "443",
    path: '/',
    headers: {
        'Accept': 'application/json'
    }

};

@Discord
export class AppDiscord {
    private static _client: Client;
    private _prefix: string = "!";

    static start() {
        this._client = new Client();
        this._client.login(
            auth.token,
            `${__dirname}/*Discord.ts`
        ).then(() => this._client.user.setAvatar('http://sam-barrett.codes/Ricardo-bot/ricardo-resources/avatar.jpg'));
    }

    @On("message")
    async onMessage(message: Message, client: Client) {
        let pref: string;
        if (message.content.substring(0, 1) === this._prefix) {
            let args = message.content.substring(1).split(' ');
            let cmd = args[0];
            if (ricardo_blacklist.get(message.author.username) !== undefined && ricardo_blacklist.get(message.author.username) > (Date.now() - (24 * 60 * 60 * 1000))) {
                message.reply("Fuck off").then(() => {
                    //pass
                }, function (err) {
                    console.log(err);
                });
            } else {
                case_response(cmd, message);
            }
        }
        if (((message.content.toLowerCase().includes("i'm")) || (message.content.toLowerCase().includes("i am"))) && message.author.tag !== client.user.tag) {

            let msg = message.content.toLowerCase();
            if ((msg.includes("i'm"))) {
                pref = "i'm";
            } else {
                pref = "i am";
            }

            let iam: any = msg.split(pref);

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
            message.reply(reply).then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
        }
        if (message.content.includes("www.bloomberg.com")) {
            message.reply("@everyone, BLOOMBERG ALERT!!").then(() => {
                //pass
            }, function (err) {
                console.log(err);
            });
        }
    }
}

function case_response(cmd: string, msg: Message) {
    switch (cmd) {

        case 'ping':
            msg.reply("pong!").then(() => {
                console.log('pong!')
            }, function (err: any) {
                console.log(err);
            });
            break;
        case 'bloomberg':
            msg.reply("bloooooombeeerrg").then(() => {
                //pass
            }, function (err: any) {
                console.log(err);
            });
            break;
        case 'vibecheck':

            msg.reply("Initialising Vibe Check").then(() => {
                //pass
            }, function (err: any) {
                console.log(err);
            });
            this._client.users.forEach(vibe_check, msg);
            break;

        case 'bigbrain':
            msg.reply({
                files:
                    ["http://sam-barrett.codes/Ricardo-bot/ricardo-resources/bigbrain.gif"]
            }).then(() => {
                //pass
            }, function (err: any) {
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
                    }, function (err: any) {
                        console.log(err);
                    });
                    process.stdout.write(d)
                });

                req.on('error', error => {
                    console.error(error);
                    msg.reply("piss off").then(() => {
                        //pass
                    }, function (err: any) {
                        console.log(err);
                    });
                });

                req.end();
            });
            break;
        case 'ricardo':
            msg.reply({
                files:
                    ["http://sam-barrett.codes/Ricardo-bot/ricardo-resources/ricardo.gif"]
            }).then(() => {
                //pass
            }, function (err: any) {
                console.log(err);
            });
            break;
        case 'motivationmonday':
            msg.reply(pick_random_quote()).then(() => {
                //pass
            }, function (err: any) {
                console.log(err);
            });
            break;
        case 'shame':
            msg.reply({
                files:
                    ["http://sam-barrett.codes/Ricardo-bot/ricardo-resources/shame.gif"]
            }).then(() => {
                //pass
            }, function (err: any) {
                console.log(err);
            });
            break;
	case 'coronatime':
            msg.reply({
                files:
                    ["http://sam-barrett.codes/Ricardo-bot/ricardo-resources/coronatime.jpg"]
            }).then(() => {
                //pass
            }, function (err: any) {
                console.log(err);
            });
	    break;
        default:
            console.log(this._commandNotFoundMessage);
    }
}


function vibe_check(value: { username: string; }) {
    this.reply("Checking " + value.username + "'s vibes").then(() => {
        //pass
    }, function (err: any) {
        console.log(err);
    });
    this.reply(".............").then(() => {
        //pass
    }, function (err: any) {
        console.log(err);
    });
    this.reply("..................................").then(() => {
        //pass
    }, function (err: any) {
        console.log(err);
    });
    this.reply("........................................................").then(() => {
        //pass
    }, function (err: any) {
        console.log(err);
    });
    const min = 1;
    const max = 10;
    let random =
        Math.floor(Math.random() * (+max - +min)) + +min;
    if (random === 1) {
        this.reply("FAILED!, " + value.username + " has bad vibes, you have lost ricardo privileges for 24hrs ").then(() => {
            //pass
        }, function (err: any) {
            console.log(err);
        });

        ricardo_blacklist.set(value.username, Date.now());
    } else {
        this.reply("PASSED").then(() => {
            //pass
        }, function (err: any) {
            console.log(err);
        });
    }
}

function pick_random_quote() {
    const array = require('./resources/quotes.json');
    // console.log(array);
    return array[Math.floor(Math.random() * array.length)];
}

AppDiscord.start();
