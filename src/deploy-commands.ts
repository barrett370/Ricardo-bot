
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { SlashCommandBuilder } from "@discordjs/builders";
import { clientID, guildID, token } from "./auth.json"

export async function deployCommands() {
    const commands = [
        new SlashCommandBuilder().setName("ping").setDescription("replies with pong"),
        new SlashCommandBuilder().setName("bigbrain").setDescription("you figure it out, smart guy"),
        new SlashCommandBuilder().setName("dad").setDescription("make a joke"),
        new SlashCommandBuilder().setName("motivationmonday").setDescription("get you going"),
        new SlashCommandBuilder().setName("shame").setDescription("shameful display"),
    ].map(command => command.toJSON());


    const rest = new REST({ version: '9' }).setToken(token);

    await rest.put(
        Routes.applicationCommands(clientID),
        { body: commands }
    )
    console.log("registered commands")

}
