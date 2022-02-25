import * as https from "https"
import * as quotes from "./resources/quotes.json";
import { Client, Intents } from "discord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { SlashCommandBuilder } from "@discordjs/builders";
import "RegExp"

const dad_joke_options = {
    hostname: 'icanhazdadjoke.com',
    port: "443",
    path: '/',
    headers: {
        'Accept': 'application/json'
    }

};

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.TOKEN
const clientID = process.env.CLIENT_ID

const commands = [
    new SlashCommandBuilder().setName("ping").setDescription("replies with pong"),
    new SlashCommandBuilder().setName("bigbrain").setDescription("you figure it out, smart guy"),
    new SlashCommandBuilder().setName("dad").setDescription("make a joke"),
    new SlashCommandBuilder().setName("motivationmonday").setDescription("get you going"),
    new SlashCommandBuilder().setName("shame").setDescription("shameful display"),
].map(command => command.toJSON());


const rest = new REST({ version: '9' }).setToken(token);
const wang = new RegExp("\d");

(async () => {

    await rest.put(
        Routes.applicationCommands(clientID),
        { body: commands }
    )
    console.log("registered commands")

})()

client.on('messageCreate', async message => {
    console.log(message);
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
        let ok = await message.reply(reply)
        if (!ok) {
            console.error("failed to reply")
        }
        return

    }
    if (message.content.toLowerCase().includes("indeed")) {
        message.reply({
            files: ["./resources/indeed.jpeg"]
        })
    }
    if (wang.test(message.content) && Math.random() < 0.1) {
        message.reply("That's numberwang!")
    }
});

client.on("message", message => {
    console.log(message);

})

client.once('ready', () => {
    console.log("ready!")
})

client.on('interactionCreate', async interaction => {
    console.log(interaction);

    if (!interaction.isCommand()) return;

    const { commandName } = interaction

    switch (commandName) {
        case 'ping':
            console.log("pinging")
            await interaction.reply("pong!");
            break
        case 'bigbrain':
            await interaction.reply({ files: ["./resources/bigbrain.gif"] })
            break
        case 'dad':
            let req = https.get(dad_joke_options, async res => {
                res.on('data', async d => {
                    let jsonContent = JSON.parse(d);
                    await interaction.reply(jsonContent.joke)
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
                    ["./resources/shame.gif"]
            })
            break;
    }

});

function pick_random_quote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

client.login(token)
