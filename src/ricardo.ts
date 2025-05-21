import * as quotes from "./resources/quotes.json";
import { Client } from "discord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { SlashCommandBuilder } from "@discordjs/builders";

type joke = {
    id: string,
    joke: string,
    status: number
};

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });
const token = process.env.TOKEN ?? ""
const clientID = process.env.CLIENT_ID ?? ""

const commands = [
    new SlashCommandBuilder().setName("ping").setDescription("replies with pong"),
    new SlashCommandBuilder().setName("bigbrain").setDescription("you figure it out, smart guy"),
    new SlashCommandBuilder().setName("dad").setDescription("make a joke"),
    new SlashCommandBuilder().setName("motivationmonday").setDescription("get you going"),
    new SlashCommandBuilder().setName("shame").setDescription("shameful display"),
].map(command => command.toJSON());


const rest = new REST({ version: '9' }).setToken(token);
const wang = /\d+/;
const discord_hash = /#\d{4}/;

(async () => {

    await rest.put(
        Routes.applicationCommands(clientID),
        { body: commands }
    )
    console.log("registered commands")

})()

client.on('messageCreate', async message => {
    let pref: string;
    let content = message.content.toLowerCase()
    console.log(content)
    if (((content.includes("i'm")) || (content.includes("i’m")) || (content.includes("i am"))) && message.author.tag !== client.user?.tag) {

        console.log("I'm going to getem")

        if ((content.includes("i am"))) {
            pref = "i am";
        } else if ((content.includes("i’m"))) {
            pref = "i’m";
        } else 
            pref = "i'm";
        }

        let iam: any = content.split(pref);

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
        let reply = "Hi" + iam + ", I'm Chris!";
        let ok = await message.reply(reply)
        if (!ok) {
            console.error("failed to reply")
        }
        return

    }
    if (message.content.toLowerCase().includes("indeed")) {
        message.reply({
            files: ["./resources/img/indeed.jpeg"]
        })
    }
    if (message.content.split(" ").map(elem => wang.test(elem) && !discord_hash.test(elem)).some(elem => elem) && Math.random() < 0.1) {
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
            const resp = await fetch("https://icanhazdadjoke.com", {
                headers: { "Accept": "application/json" }
            });

            const body = await resp.json() as joke;

            await interaction.reply(body.joke)

            break;
        case 'motivationmonday':
            await interaction.reply(`${pick_random_quote()}`);
            break;
        case 'shame':
            await interaction.reply({
                files:
                    ["./resources/shame.gif"]
            })
            break;
    }

});

function pick_random_quote(): String {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

client.login(token)
