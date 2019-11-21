var Discord = require('discord.js');
var client = new Discord.Client();
var auth = require('./auth.json');
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
var dad_joke_options = {
    hostname: 'icanhazdadjoke.com',
    port: "443",
    path: '/',
    headers: {
        'Accept': 'application/json'
    }
};
var ricardo_blacklist = new Map();
var https = require('https');
client.on('message', function (msg) {
    var pref;
    if (msg.content.substring(0, 1) === '!') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        if (ricardo_blacklist.get(msg.author.username) !== undefined && ricardo_blacklist.get(msg.author.username) > (Date.now() - (24 * 60 * 60 * 1000))) {
            msg.reply("Fuck off").then(function () {
                //pass
            }, function (err) {
                console.log(err);
            });
        }
        else {
            case_response(cmd, msg);
        }
    }
    if (((msg.content.toLowerCase().includes("i'm")) || (msg.content.toLowerCase().includes("i am"))) && msg.author.tag !== client.user.tag) {
        var message = msg.content.toLowerCase();
        if ((message.includes("i'm"))) {
            pref = "i'm";
        }
        else {
            pref = "i am";
        }
        var iam = message.split(pref);
        iam = iam[1];
        if (iam.includes(".")) {
            iam = iam.split(".")[0];
        }
        else if (iam.includes(",")) {
            iam = iam.split(",")[0];
        }
        var determinants = ['the', 'a', 'an'];
        for (var i = 0; i < determinants.length; i++) {
            iam = iam.replace(new RegExp("\\b" + determinants[i] + "\\b"), '');
        }
        var reply = "Hi" + iam + ", I'm Dad!";
        msg.reply(reply).then(function () {
            //pass
        }, function (err) {
            console.log(err);
        });
    }
    if (msg.content.includes("www.bloomberg.com")) {
        msg.reply("@everyone, BLOOMBERG ALERT!!").then(function () {
            //pass
        }, function (err) {
            console.log(err);
        });
    }
});
function case_response(cmd, msg) {
    switch (cmd) {
        case 'ping':
            msg.reply("pong!").then(function () {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'bloomberg':
            msg.reply("bloooooombeeerrg").then(function () {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'vibecheck':
            msg.reply("Initialising Vibe Check").then(function () {
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
                files: ["http://sam-barrett.codes/Ricardo-bot/ricardo-resources/bigbrain.gif"]
            }).then(function () {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'dad':
            var req_1 = https.get(dad_joke_options, function (res) {
                console.log("statusCode: " + res.statusCode);
                res.on('data', function (d) {
                    var jsonContent = JSON.parse(d);
                    msg.reply(jsonContent.joke).then(function () {
                        //pass
                    }, function (err) {
                        console.log(err);
                    });
                    process.stdout.write(d);
                });
                req_1.on('error', function (error) {
                    console.error(error);
                    msg.reply("piss off").then(function () {
                        //pass
                    }, function (err) {
                        console.log(err);
                    });
                });
                req_1.end();
            });
            break;
        case 'ricardo':
            msg.reply({
                files: ["http://sam-barrett.codes/Ricardo-bot/ricardo-resources/resources/ricardo.gif"]
            }).then(function () {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'motivationmonday':
            msg.reply(pick_random_quote()).then(function () {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
        case 'shame':
            msg.reply({
                files: ["http://sam-barrett.codes/Ricardo-bot/ricardo-resources/resources/shame.gif"]
            }).then(function () {
                //pass
            }, function (err) {
                console.log(err);
            });
            break;
    }
}
function vibe_check(value) {
    this.reply("Checking " + value.username + "'s vibes").then(function () {
        //pass
    }, function (err) {
        console.log(err);
    });
    this.reply(".............").then(function () {
        //pass
    }, function (err) {
        console.log(err);
    });
    this.reply("..................................").then(function () {
        //pass
    }, function (err) {
        console.log(err);
    });
    this.reply("........................................................").then(function () {
        //pass
    }, function (err) {
        console.log(err);
    });
    var min = 1;
    var max = 10;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    if (random === 1) {
        this.reply("FAILED!, " + value.username + " has bad vibes, you have lost ricardo privileges for 24hrs ").then(function () {
            //pass
        }, function (err) {
            console.log(err);
        });
        ricardo_blacklist.set(value.username, Date.now());
    }
    else {
        this.reply("PASSED").then(function () {
            //pass
        }, function (err) {
            console.log(err);
        });
    }
}
function pick_random_quote() {
    var array = require('http://sam-barrett.codes/Ricardo-bot/ricardo-resources/resources/quotes.json');
    console.log(array);
    return array[Math.floor(Math.random() * array.length)];
}
client.login(auth.token).then(function () { return client.user.setAvatar('http://sam-barrett.codes/Ricardo-bot/ricardo-resources/resources/avatar.jpg'); });
process.on('SIGINT', function () {
    process.exit();
});
