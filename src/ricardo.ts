import * as https from "https"
import * as quotes from "./resources/quotes.json";
import { Client, Intents } from "discord.js"
import {deployCommands} from "./deploy-commands"

const dad_joke_options = {
    hostname: 'icanhazdadjoke.com',
    port: "443",
    path: '/',
    headers: {
        'Accept': 'application/json'
    }

};
const siteURL: string = "http://barrett370.github.io/Ricardo-bot/ricardo-resources/"

deployCommands()


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
import { token } from "./auth.json"

client.on('messageCreate', async message => {
    let pref: string;
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
        return
    }
    if (message.content.toLowerCase().includes("indeed")) {
        message.reply({
            files: [siteURL + "indeed.jpeg"]
        })
    }
});

client.once('ready', () => {
    console.log("ready!")
})

client.on('interactionCreate', async interaction => {
    console.log(interaction);
    
    if (!interaction.isCommand()) return;

    const {commandName} = interaction

    switch (commandName) {
        case 'ping':
            console.log("pinging")
            await interaction.reply("pong!");
            break
        case 'bigbrain':
            await interaction.reply({ files: [siteURL + "bigbrain.gif"] })
            break
        case 'dad':
            let req = https.get(dad_joke_options, async res => {
                console.log(`statusCode: ${res.statusCode}`);

                res.on('data', async d => {
                    let jsonContent = JSON.parse(d);
                    await interaction.reply(jsonContent.joke)
                    process.stdout.write(d)
                });
            });

            req.on('error', async (error) => {
                console.error(error)
                await interaction.reply("All outta jokes")
            });
            req.end();
            break;
        case 'motivationmonday':
            await interaction.reply(pick_random_quote())
            break;
        case 'shame':
            await interaction.reply({
                files:
                    [siteURL + "shame.gif"]
            })
            break;
    }

});

function pick_random_quote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

client.login(token)
