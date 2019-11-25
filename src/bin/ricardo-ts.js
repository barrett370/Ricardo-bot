"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_1 = require("@typeit/discord");
// import auth = require('./auth.json');
var auth = __importStar(require("./auth.json"));
var ricardo_blacklist = new Map();
// import https = require('https');
var https = __importStar(require("https"));
var dad_joke_options = {
    hostname: 'icanhazdadjoke.com',
    port: "443",
    path: '/',
    headers: {
        'Accept': 'application/json'
    }
};
var AppDiscord = /** @class */ (function () {
    function AppDiscord() {
        this._prefix = "!";
    }
    AppDiscord.start = function () {
        var _this = this;
        this._client = new discord_1.Client();
        this._client.login(auth.token, __dirname + "/*Discord.ts").then(function () { return _this._client.user.setAvatar('http://sam-barrett.codes/Ricardo-bot/ricardo-resources/resources/avatar.jpg'); });
    };
    AppDiscord.prototype.onMessage = function (message, client) {
        return __awaiter(this, void 0, void 0, function () {
            var pref, args, cmd, msg, iam, determinants, i, reply;
            return __generator(this, function (_a) {
                if (message.content.substring(0, 1) === this._prefix) {
                    args = message.content.substring(1).split(' ');
                    cmd = args[0];
                    if (ricardo_blacklist.get(message.author.username) !== undefined && ricardo_blacklist.get(message.author.username) > (Date.now() - (24 * 60 * 60 * 1000))) {
                        message.reply("Fuck off").then(function () {
                            //pass
                        }, function (err) {
                            console.log(err);
                        });
                    }
                    else {
                        case_response(cmd, message);
                    }
                }
                if (((message.content.toLowerCase().includes("i'm")) || (message.content.toLowerCase().includes("i am"))) && message.author.tag !== client.user.tag) {
                    msg = message.content.toLowerCase();
                    if ((msg.includes("i'm"))) {
                        pref = "i'm";
                    }
                    else {
                        pref = "i am";
                    }
                    iam = msg.split(pref);
                    iam = iam[1];
                    if (iam.includes(".")) {
                        iam = iam.split(".")[0];
                    }
                    else if (iam.includes(",")) {
                        iam = iam.split(",")[0];
                    }
                    determinants = ['the', 'a', 'an'];
                    for (i = 0; i < determinants.length; i++) {
                        iam = iam.replace(new RegExp("\\b" + determinants[i] + "\\b"), '');
                    }
                    reply = "Hi" + iam + ", I'm Dad!";
                    message.reply(reply).then(function () {
                        //pass
                    }, function (err) {
                        console.log(err);
                    });
                }
                if (message.content.includes("www.bloomberg.com")) {
                    message.reply("@everyone, BLOOMBERG ALERT!!").then(function () {
                        //pass
                    }, function (err) {
                        console.log(err);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        discord_1.On("message")
    ], AppDiscord.prototype, "onMessage", null);
    AppDiscord = __decorate([
        discord_1.Discord
    ], AppDiscord);
    return AppDiscord;
}());
exports.AppDiscord = AppDiscord;
function case_response(cmd, msg) {
    switch (cmd) {
        case 'ping':
            msg.reply("pong!").then(function () {
                console.log('pong!');
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
            this._client.users.forEach(vibe_check, msg);
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
        default:
            console.log(this._commandNotFoundMessage);
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
    // console.log(array);
    return array[Math.floor(Math.random() * array.length)];
}
AppDiscord.start();
